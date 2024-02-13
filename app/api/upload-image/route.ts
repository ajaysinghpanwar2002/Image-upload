import { connectToDatabase, disconnectDatabase, fetchAllImagesDatabase, uploadImageToCloudinary, uploadImageUrlToMongodb, deleteImageFromMongodb } from "@/helper/server-helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    const email = formData.get("userEmail") as string;

    try {
        const { secure_url } = await uploadImageToCloudinary(image, "blinkit-image") as any;
        await connectToDatabase();
        const uploadedImageData = await uploadImageUrlToMongodb(secure_url, email);
        return NextResponse.json({ uploadedImageData }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    } finally {
        await disconnectDatabase();
    }
}

export const GET = async () => {
    const Images = await fetchAllImagesDatabase();
    return NextResponse.json({ images: Images, total: Images.length }, { status: 201 })
}

export const DELETE = async (req: NextRequest) => {
    const { id } = await req.json();
    try {
        await connectToDatabase();
        await deleteImageFromMongodb(id);
        return NextResponse.json({ message: "Image Deleted" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    } finally {
        await disconnectDatabase();
    }
}