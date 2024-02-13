'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation'

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        if (!validateEmail(formData.email)) {
            setError('Invalid email format');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        setError('');
        // Call your API endpoint
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            setSuccess('User registered successfully');
            setFormData({ name: '', email: '', password: '' });
            redirect('/sign-in')
        } else {
            setError(data.message || 'An error occurred during registration');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div>
                <label htmlFor="name" className="block">Name</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block">Password</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Sign Up
            </button>
        </form>
    );
};

export default SignupForm;
