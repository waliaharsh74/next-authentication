import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/app/lib/prismadb'
import bcrypt from 'bcrypt'
import { SignupFormSchema } from "@/app/lib/definations";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "smith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                const email = credentials?.email
                const password = credentials?.password
                const validatedFields = SignupFormSchema.safeParse({

                    email: email,
                    password: password
                })
                if (!validatedFields.success) {
                    null
                }

                const user = await prisma?.user.findFirst({ where: { email } })

                if (user && user && password && await bcrypt.compare(password, user.password)) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: "process.env.GOOGLE_CLIENT_ID",
            clientSecret: "process.env.GOOGLE_CLIENT_SECRET"
        })
    ]
})
export { handler as GET, handler as POST }