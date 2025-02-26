import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Home() {
    const { auth } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our App</h1>

                {auth?.user ? (
                    <>
                        <p className="text-lg text-gray-700 mb-4">
                            Hello, <span className="font-semibold text-blue-600">{auth.user.email}</span>!
                        </p>
                        <Link to="/profile" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                            Go to Profile
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-lg text-gray-700 mb-4">Please log in to access your profile.</p>
                        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
