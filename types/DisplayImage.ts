export interface ImageCardProps {
    image: {
        id: string;
        url: string;
        useremail: string;
    };
    userEmail: string;
    deleteImage: (id: string) => void;
}

export interface DisplayImageProps {
    userEmail: string;
}

export interface ImageProps {
    id: string;
    url: string;
    useremail: string;
    createdAt: string;
    updatedAt: string;
}