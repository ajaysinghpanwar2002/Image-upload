'use client';

import useImages from "@/hooks/useImages";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCardProps {
    image: {
        id: string;
        url: string;
        useremail: string;
    };
    userEmail: string;
    deleteImage: (id: string) => void;
}

function ImageCard({ image, userEmail, deleteImage }: ImageCardProps) {
    const isOwnImage = image.useremail === userEmail;

    return (
        <div className={`relative ${!isOwnImage ? "filter blur-md" : ""}`}>
            <Image
                src={image.url}
                alt=""
                layout="responsive"
                width={100}
                height={100}
                objectFit="cover"
            />
            {isOwnImage && (
                <button
                    onClick={() => deleteImage(image.id)}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white p-1 rounded"
                >
                    Delete
                </button>
            )}
        </div>
    );
}

interface DisplayImageProps {
    userEmail: string;
}
interface Image {
    id: string;
    url: string;
    useremail: string;
    createdAt: string;
    updatedAt: string;
}

function DisplayImage({ userEmail }: DisplayImageProps) {
    const [images, setImages] = useState<Image[]>([]);
    const fetchedImages = useImages();

    useEffect(() => {
        setImages(fetchedImages);
    }, [fetchedImages]);

    const deleteImage = async (id: string) => {
        try {
            const response = await fetch("/api/upload-image", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setImages(images.filter(image => image.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete the image:", error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
                <ImageCard
                    key={image.id}
                    image={image}
                    userEmail={userEmail}
                    deleteImage={deleteImage}
                />
            ))}
        </div>
    );
}

export default DisplayImage;