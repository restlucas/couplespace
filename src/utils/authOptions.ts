import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { JWT } from "next-auth/jwt";
import { Account } from "next-auth";
import { Session } from "next-auth";

// Inicializando o PrismaClient
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
    async redirect({
      url,
      baseUrl,
    }: {
      url: string;
      baseUrl: string;
    }): Promise<string> {
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return url;
    },

    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User; // O tipo exato do `user` pode ser `User` do NextAuth ou Prisma, dependendo de como você implementou.
    }): Promise<JWT> {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    async signIn({
      user,
      account,
    }: {
      user: User; // O tipo exato de `user` pode ser o tipo `User` do NextAuth ou o tipo customizado do Prisma
      account: Account | null;
    }): Promise<boolean> {
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
            provider: account?.provider ?? "",
            type: account?.type ?? "",
            providerAccountId: account?.providerAccountId ?? "",
            accessToken: account?.access_token ?? "",
            userId: existingUser.id,
          },
        });
      }

      return true;
    },
  },
};
