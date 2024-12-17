'use client'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(null);
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();

    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        console.log({res});
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        setError(null);
        router.push('/CRUD')

    } catch(e){
        console.error(e);
        switch (e.code) {
            case 'auth/user-not-found':
              setError('User does not exist.');
              break;
            case 'auth/wrong-password':
              setError('Incorrect password.');
              break;
            case 'auth/invalid-email':
              setError('Invalid email format.');
              break;
            default:
              setError('Sign In failed. Please try again.');
          }
    }
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
            {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
        )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              /> 
        <button className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
            Login
        </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default SignIn
