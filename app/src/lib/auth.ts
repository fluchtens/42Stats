import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import FortyTwoProvider from "next-auth/providers/42-school";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_UID,
      clientSecret: process.env.FORTY_TWO_SECRET,
    }),
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
});
