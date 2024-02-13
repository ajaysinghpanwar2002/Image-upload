import { connectToDatabase, createUser, disconnectDatabase, getUserByEmail, hashPassword } from "@/helper/server-helper";
import { NextResponse } from "next/server";

const HTTP_STATUS_CODES = {
    UNPROCESSABLE_ENTITY: 422,
    CONFLICT: 409,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
};

const handleServerError = (error: Error) => {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR });
};

export const POST = async (req: Request) => {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Invalid Data" }, { status: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
        }

        const hashedPassword = await hashPassword(password);
        await connectToDatabase();
        const existingUserByEmail = await getUserByEmail(email);

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: HTTP_STATUS_CODES.CONFLICT });
        }

        const newUser = await createUser(email, name, hashedPassword);

        return NextResponse.json({ newUser }, { status: HTTP_STATUS_CODES.CREATED });
    } catch (error) {
        return handleServerError(error as Error);
    } finally {
        await disconnectDatabase();
    }
};