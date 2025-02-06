import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions, User, Account } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
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
      if (url.startsWith(baseUrl)) {
        if (url.endsWith("/login")) {
          const locale = url.split("/")[3];
          return `${baseUrl}/${locale}/dashboard`;
        } else {
          return url;
        }
      } else {
        return baseUrl;
      }
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;

        const userPage = await prisma.page.findFirst({
          where: {
            couple: {
              some: {
                userId: token.id as string,
              },
            },
          },
          select: {
            randomId: true,
            slug: true,
          },
        });

        session.user.pageLink = userPage
          ? `/${userPage.randomId}/${userPage.slug}`
          : "";
      }

      return session;
    },

    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }) {
      if (!user || !account) {
        return false;
      }

      const existingUser = await prisma.user.upsert({
        where: {
          email: user.email ?? "",
        },
        update: {
          name: user.name ?? "",
          image: user.image ?? "",
        },
        create: {
          email: user.email ?? "",
          name: user.name ?? "",
          image: user.image ?? "",
        },
      });

      if (account) {
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            accessToken: account.access_token ?? "no-token",
          },
          create: {
            provider: account.provider,
            type: account.type,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token ?? "no-token",
            userId: existingUser.id,
          },
        });
      }

      return true;
    },
  },
};
