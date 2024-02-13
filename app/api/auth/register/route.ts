import { connectToDatabase, createNewUser, disconnectDatabase, findUserUsingEmail, generateHashPasword } from "@/helper/server-helper";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) return NextResponse.json({ message: "Invalid Data" }, { status: 422 })

        const hashedPassword = await generateHashPasword(password);
        await connectToDatabase();
        const existingUserByEmail = await findUserUsingEmail(email);
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
        }
        const newUser = await createNewUser(email, name, hashedPassword);

        return NextResponse.json({ newUser }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    } finally {
        await disconnectDatabase();
    }
}