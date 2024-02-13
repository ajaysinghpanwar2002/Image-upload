import prisma from "@/prisma"
import bcrypt from 'bcrypt'
import cloudinary from './cloudinary'
import {DATABASE_CONNECTION_ERROR, DATABASE_DISCONNECTION_ERROR, PASSWORD_HASH_ERROR, PASSWORD_COMPARE_ERROR, USER_CREATION_ERROR, USER_FETCH_ERROR, USER_EMAIL_FETCH_ERROR, IMAGE_UPLOAD_ERROR, IMAGE_FETCH_ERROR, IMAGE_DELETE_ERROR} from "@/constants"

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error(DATABASE_CONNECTION_ERROR);
    }
}

export const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
    } catch (error) {
        throw new Error(DATABASE_DISCONNECTION_ERROR);
    }
}

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error(PASSWORD_HASH_ERROR);
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorrect;
    } catch (error) {
        throw new Error(PASSWORD_COMPARE_ERROR);
    }
}

export const createUser = async (email: string, name: string, hashedPassword: string) => {
    try {
        const newUser = await prisma.user.create({ data: { email, name, hashedPassword } })
        return newUser;
    } catch (error) {
        throw new Error(USER_CREATION_ERROR);
    }
}

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error(USER_FETCH_ERROR);
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: email }
        })
        return user;
    } catch (error) {
        throw new Error(USER_EMAIL_FETCH_ERROR);
    }
}

export const uploadImageToDatabase = async (url: string, useremail: string) => {
    try {
        const uploadedData = await prisma.image.create({ data: { url, useremail } })
        return uploadedData;
    } catch (error) {
        throw new Error(IMAGE_UPLOAD_ERROR);
    }
}

export const uploadImageToCloudinary = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer)

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder: folder
        }, (err, result) => {
            if (err) {
                reject(err.message)
            }
            resolve(result)
        }).end(bytes)
    })
}

export const fetchAllImagesFromDatabase = async () => {
    try {
        const Images = await prisma.image.findMany({})
        return Images;
    } catch (error) {
        throw new Error(IMAGE_FETCH_ERROR);
    }
}

export const deleteImageFromDatabase = async (id: string) => {
    try {
        await prisma.image.delete({ where: { id } })
    } catch (error) {
        throw new Error(IMAGE_DELETE_ERROR);
    }
}