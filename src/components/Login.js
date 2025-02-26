import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const { setAuth } = useAuth();

    const inputRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password }; 
        console.log(credentials);
        setEmail('');
        setPassword('');

    
        try {
            const response = await instance.post('/login', credentials); // Sending 'credentials' to the backend
            // console.log(response.data);
            const { data } = response;
            if (data && data.access_token && data.refresh_token) {
                const { access_token, refresh_token } = data;
                setAuth({ accessToken: access_token, refreshToken: refresh_token, user: credentials });
                // console.log("userData", data); // Logging the full response
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                localStorage.setItem('user', JSON.stringify(credentials));
    
                navigate(from, { replace: true });
            } else {
                setErrMsg('Invalid response from the server');
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Login failed, please try again';
            setErrMsg(errMsg);
            setEmail('');
            setPassword('');
        }
    };
    

    useEffect(() => {
        inputRef.current.focus(); // Focus on the email input field
    }, []);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='bg-sky-100 p-6 flex flex-col items-center justify-center space-y-4 rounded-md shadow-md w-full max-w-sm mx-auto'>
            <h1 className="text-2xl font-bold">Login</h1>
            {/* <p className="text-lg text-gray-700">Log in to access the app</p> */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit} className="w-full">
                <div className='flex flex-col space-y-4'>
                    {/* <label htmlFor="email" className="text-sm text-gray-600">Email</label> */}
                    <input
                        placeholder='Email'
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrMsg(''); // Clear error message on input change
                        }}
                        value={email}
                        ref={inputRef}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                    {/* <label htmlFor="password" className="text-sm text-gray-600">Password</label> */}
                    <input
                        placeholder='Password'
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrMsg(''); // Clear error message on input change
                        }}
                        value={password}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="text-sm mt-4">
                Need an account? <Link to="/register" className="text-sky-500 hover:underline">Sign up</Link>
            </p>
        </div>
        </div>
    );
}
