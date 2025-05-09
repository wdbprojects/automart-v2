import NextAuth from "next-auth";
import { config } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(config);
