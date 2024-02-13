'use client';

import React, { useState, useCallback } from 'react';
import { SignupFormData } from '@/types';
import { REGISTER_URL, SIGN_IN_URL } from '@/constants';

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

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isEmailValid = useCallback((email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        if (!isEmailValid(formData.email)) {
            setError('Invalid email format');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        setError('');
        const response = await fetch(REGISTER_URL, {
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
            window.location.href = SIGN_IN_URL;
        } else {
            setError(data.message || 'An error occurred during registration');
        }
    }, [formData, isEmailValid]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <FormField label="Name" type="text" value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} />
            <FormField label="Email" type="email" value={formData.email} onChange={(value) => setFormData({ ...formData, email: value })} />
            <FormField label="Password" type="password" value={formData.password} onChange={(value) => setFormData({ ...formData, password: value })} />
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Sign Up
            </button>
        </form>
    );
};

export default SignupForm;