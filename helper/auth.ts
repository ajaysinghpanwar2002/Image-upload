import { checkHashPassword, connectToDatabase, disconnectDatabase, findUserUsingEmail } from "@/helper/server-helper";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", placeholder: "Enter Email" },
                password: { label: "Password", placeholder: "Enter Password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) return null;
                try {
                    await connectToDatabase();
                    const user = await findUserUsingEmail(credentials.email);
                    if (!user?.hashedPassword) return null;
                    const isPasswordCorrect = await checkHashPassword(credentials.password, user.hashedPassword);
                    if (isPasswordCorrect) return user;
                    else return null;
                } catch (error) {
                    console.error(error)
                    return null;
                } finally {
                    await disconnectDatabase();
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            return token
        },
        async session({ session, user, token }) {
            return session
        }
    }
}