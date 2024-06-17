// LoginPage.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/input/InputField';
import SubmitButton from '@/components/buttons/SubmitButton';
import { signIn } from 'next-auth/react'; // Import signIn function from next-auth/client
import useDateTime from '@/hooks/useDateTime';

export default function LoginPage() {
    const { currentTime, currentDate, currentDay } = useDateTime();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false, // Prevents redirect after signin
                username,
                password,
            });

            if (result && result.ok) {
                await router.push('/dashboard'); // Redirect to dashboard on successful login
            } else {
                console.error('Sign in failed:', result?.error); // Optional chaining for result.error
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            setError('Sign in error. Please try again later.');
        }
    };

    return (
        <div className="bg-[#0b002e] min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-white text-right w-full mb-4">
                <div>{currentTime}</div>
                <div>{currentDay}, {currentDate}</div>
            </div>
            <h1 className="text-4xl font-bold text-center text-white mb-6">SERENA HOTEL</h1>
            <div className="max-w-md w-full border border-white p-8 rounded-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>
                <form className="w-full" onSubmit={handleLogin}>
                    <InputField
                        label="User Name"
                        id="username"
                        type="text"
                        className="bg-[#2b2d35]"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        className="bg-[#2b2d35]"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div className="flex items-center justify-end mb-4">
                        <a href="#" className="text-white hover:text-blue-500 text-sm">
                            Reset Password
                        </a>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mb-4">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-center mb-4">
                        <SubmitButton
                            bgColor="#FEC900"
                            textColor="#0072AE"
                            width="100px"
                            height="40px"
                            className="hover:bg-yellow-700"
                            text="Login"
                        />
                    </div>
                    <div>
                        <a href="#" className="text-blue-500 hover:text-blue-800 text-sm font-bold">
                            Reset Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
