'use server'
import { SignupFormSchema, FormState } from '@/app/lib/definations'
import prisma from '@/app/lib/prismadb'
import bcrypt from 'bcrypt'


export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const { name, email, password } = validatedFields.data
    const isUser = await prisma.user.findFirst({ where: { email } })
    if (isUser) {
        return {
            message: "user with email already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }

    })

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
            status: "failed"
        }

    }
    else {
        return {
            message: 'User Created Successfully',
            status: "success"
        }

    }



}