'use client';

import useImages from "@/hooks/useImages";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ImageCardProps, DisplayImageProps, ImageProps } from "@/types"

const ImageCard: React.FC<ImageCardProps> = ({ image, userEmail, deleteImage }) => {
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
};

const DisplayImage: React.FC<DisplayImageProps> = ({ userEmail }) => {
    const [images, setImages] = useState<ImageProps[]>([]);
    const fetchedImages = useImages();

    useEffect(() => {
        setImages(fetchedImages ?? []);
    }, [fetchedImages]);

    const deleteImage = useCallback(async (id: string) => {
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
    }, [images]);

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
};

export default DisplayImage;