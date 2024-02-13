'use client';

import { useState } from "react";

function ImageUpload({ userEmail }: { userEmail: string }) {
    const [image, setImage] = useState<File | null>(null);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        console.log("user email", userEmail);
        formData.append("userEmail", userEmail);

        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setImage(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4 items-center p-4">
            <input
                onChange={onChangeHandler}
                type="file"
                className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                    Upload
                </button>
            )}
        </form>
    );
}

export default ImageUpload;