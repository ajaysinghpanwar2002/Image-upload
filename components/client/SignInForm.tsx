'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { HOME_URL } from '@/constants';

const FormField: React.FC<{
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}> = ({ label, type, value, onChange }) => (
    <div>
        <label htmlFor={label} className="block">{label}</label>
        <input
            type={type}
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
        />
    </div>
);

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false, // Prevent NextAuth from redirecting automatically
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            window.location.href = HOME_URL;
        }
    }, [email, password]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <FormField label="Email" type="email" value={email} onChange={setEmail} />
            <FormField label="Password" type="password" value={password} onChange={setPassword} />
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Sign In
            </button>
        </form>
    );
};

export default SignInForm;