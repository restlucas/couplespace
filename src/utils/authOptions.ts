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
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return url;
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
      // Verifica se os parâmetros 'user' e 'account' são válidos
      if (!user || !account) {
        return false; // Caso contrário, retorne falso
      }

      // Verifica se o usuário já existe na base de dados
      let existingUser = await prisma.user.findFirst({
        where: {
          email: user.email ?? "", // Garante que email seja uma string válida
        },
      });

      // Se o usuário não existir, cria um novo
      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email ?? "", // Garante que email seja string ou null
            name: user.name ?? "", // Garante que name seja string ou null
            image: user.image ?? "", // Garante que image seja string ou null
          },
        });

        // Caso tenha um 'account', cria a conta associada ao usuário
        if (account) {
          // Assegura que o 'account' tem todas as propriedades necessárias
          await prisma.account.create({
            data: {
              provider: account.provider,
              type: account.type,
              providerAccountId: account.providerAccountId,
              accessToken: account.access_token ?? "no-token", // Usa uma string vazia se accessToken for null ou undefined
              userId: existingUser.id,
            },
          });
        }
      }

      return true; // Caso o login seja bem-sucedido, retornamos 'true'
    },
  },
};
