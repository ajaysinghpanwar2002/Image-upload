'use client';

import { useEffect, useState } from "react";

interface Image {
    id: string;
    url: string;
    useremail: string;
    createdAt: string;
    updatedAt: string;
}

const useImages = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/upload-image');
                const data = await response.json();
                if (data && data.images) {
                    setImages(data.images);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return images;
};

export default useImages;