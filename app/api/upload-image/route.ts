import { connectToDatabase, disconnectDatabase, fetchAllImagesFromDatabase, uploadImageToCloudinary, uploadImageToDatabase, deleteImageFromDatabase } from "@/helper/server-helper";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "@/constants";

const handleServerError = (error: Error) => {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR });
};

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    const email = formData.get("userEmail") as string;

    try {
        const { secure_url } = await uploadImageToCloudinary(image, "blinkit-image") as any;
        await connectToDatabase();
        const uploadedImageData = await uploadImageToDatabase(secure_url, email);
        return NextResponse.json({ uploadedImageData }, { status: HTTP_STATUS_CODES.CREATED });
    } catch (error) {
        return handleServerError(error as Error);
    } finally {
        await disconnectDatabase();
    }
};

export const GET = async () => {
    const Images = await fetchAllImagesFromDatabase();
    return NextResponse.json({ images: Images, total: Images.length }, { status: HTTP_STATUS_CODES.OK });
};

export const DELETE = async (req: NextRequest) => {
    const { id } = await req.json();
    try {
        await connectToDatabase();
        await deleteImageFromDatabase(id);
        return NextResponse.json({ message: "Image Deleted" }, { status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        return handleServerError(error as Error);
    } finally {
        await disconnectDatabase();
    }
};