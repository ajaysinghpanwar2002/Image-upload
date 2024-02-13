import SignInForm from "@/components/client/SignInForm";
import { FC } from 'react';

const SignInPage: FC = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <SignInForm />
    </div>
);

export default SignInPage;