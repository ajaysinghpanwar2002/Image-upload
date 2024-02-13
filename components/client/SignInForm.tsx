'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false, // Prevent NextAuth from redirecting automatically
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            window.location.href = '/';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Sign In
            </button>
        </form>
    );
};

export default SignInForm;
