import prisma from "@/prisma"
import bcrypt from 'bcrypt'
import cloudinary from './cloudinary'

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error("unable to connect to database")
    }
}

export const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
    } catch (error) {
        throw new Error("unable to disconnect to database")
    }
}

export const generateHashPasword = async (password: string) => {
    try {
        const hashedPassword = bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error("unable to generate hash of password")
    }
}

export const checkHashPassword = async (password: string, hashedPassword: string) => {
    try {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorrect;
    } catch (error) {
        throw new Error("unable to compare the passwords")
    }
}

export const createNewUser = async (email: string, name: string, hashedPassword: string) => {
    try {
        const newUser = prisma.user.create({ data: { email, name, hashedPassword } })
        return newUser;
    } catch (error) {
        throw new Error("unable to add user to database")
    }
}

export const findUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error("unable to find users in the database")
    }
}

export const findUserUsingEmail = async (email: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: email }
        })
        return user;
    } catch (error) {
        throw new Error("usable to find user with that email")
    }
}

export const uploadImageUrlToMongodb = async (url: string, useremail: string) => {
    try {
        const uploadedData = await prisma.image.create({ data: { url, useremail } })
        return uploadedData;
    } catch (error) {
        throw new Error("unable to upload data to database")
    }
}

export const uploadImageToCloudinary = async (file: File, folder: string) => {

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer)

    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder: folder
        }, async (err, result) => {
            if (err) {
                reject(err.message)
            }
            resolve(result)
        }).end(bytes)
    })
}

export const fetchAllImagesDatabase = async () => {
    try {
        const Images = await prisma.image.findMany({})
        return Images;
    } catch (error) {
        throw new Error("unable to fetch images from database")
    }
}

export const deleteImageFromMongodb = async (id: string) => {
    try {
        await prisma.image.delete({ where: { id } })
    } catch (error) {
        throw new Error("unable to delete image from database")
    }
}