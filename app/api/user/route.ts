import { connectToDatabase, disconnectDatabase, getUsers } from "@/helper/server-helper"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();
        const users = await getUsers();
        return NextResponse.json({ users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 })
    } finally {
        await disconnectDatabase();
    }
}