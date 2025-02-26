import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Profile() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null); // Clear auth state
        localStorage.removeItem('user'); // Remove from localStorage
        navigate('/', { replace: true }); // Redirect to home
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
                {auth?.user ? (
                    <>
                        <p className="text-lg text-gray-700">
                            Welcome, <span className="font-semibold text-blue-600">{auth.user.email}</span>!
                        </p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-center text-red-500">You need to log in to see this page.</p>
                )}
            </div>
        </div>
    );
}
