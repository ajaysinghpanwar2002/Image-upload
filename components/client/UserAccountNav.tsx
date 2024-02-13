'use client';

import React from 'react'
import { signOut } from "next-auth/react";

function UserAccountNav() {
    return (
        <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-150 ease-in-out">
            Logout
        </button>
    )
}

export default UserAccountNav