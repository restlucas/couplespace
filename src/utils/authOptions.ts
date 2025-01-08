import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return url;
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      let existingUser = await prisma.user.findFirst({
        where: {
          email: user?.email ?? "",
        },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user?.email ?? "",
            name: user?.name ?? "",
            image: user?.image ?? "",
          },
        });

        await prisma.account.create({
          data: {
            provider: account.provider,
            type: account.type,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
            userId: existingUser.id,
          },
        });
      }

      return true;
    },
  },
};
