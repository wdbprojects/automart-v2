import { NextAuthConfig, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import ResendProvider from "next-auth/providers/resend";
import { SESSION_MAX_AGE } from "@/config/constants";
import { SignInSchema } from "@/app/schemas/auth.schema";
import { bcryptPasswordCompare } from "./lib/bcrypt";
import { routes } from "./config/routes";

export const config = {
  adapter: PrismaAdapter(prisma),
  useSecureCookies: false,
  trustHost: true,
  session: {
    strategy: "database",
    maxAge: SESSION_MAX_AGE / 1000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const validatedFields = SignInSchema.safeParse(credentials);
          if (!validatedFields.success) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: {
              email: validatedFields.data.email,
            },
            select: {
              id: true,
              hashedPassword: true,
            },
          });

          if (!user) return null;
          const match = await bcryptPasswordCompare(
            validatedFields.data.password,
            user.hashedPassword,
          );
          if (!match) return null;
          // issue a challenge

          return { ...user, requires2FA: true };
        } catch (error) {
          console.log({ error: error });
          return null;
        }
      },
    }),
    ResendProvider({}),
  ],
  pages: {
    signIn: routes.signIn,
    signOut: routes.signOut,
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ user, token }) {
      const session = await prisma.session.create({
        data: {
          expires: new Date(Date.now() + SESSION_MAX_AGE),
          sessionToken: crypto.randomUUID(),
          userId: user.id as string,
          required2FA: user.requires2FA as boolean,
        },
      });

      if (!session) return null;
      if (user) {
        token.requires2FA = user.requires2FA;
      }
      token.id = session.sessionToken;
      token.exp = session.expires.getTime();
      return token;
    },
    async session({ session, user }) {
      const newSession = {
        user: user,
        requires2FA: session.requires2FA,
        expires: session.expires,
      };
      return newSession;
    },
  },
  jwt: {
    encode: async ({ token }) => {
      return token?.id as string;
    },
  },
} as NextAuthConfig;
