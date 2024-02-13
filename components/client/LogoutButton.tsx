'use client';

import React, { FC, useCallback } from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton: FC = () => {
    const handleSignOut = useCallback(() => {
        signOut();
    }, []);

    return (
        <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-150 ease-in-out">
            Logout
        </button>
    );
};

export default LogoutButton;