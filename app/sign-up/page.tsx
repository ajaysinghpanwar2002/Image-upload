import SignupForm from '@/components/client/SignupForm';
import React, { FC } from 'react';

const SignupPage: FC = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <SignupForm />
    </div>
);

export default SignupPage;