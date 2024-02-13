'use client';

import { useEffect, useState } from "react";
import { Image } from "@/types";

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