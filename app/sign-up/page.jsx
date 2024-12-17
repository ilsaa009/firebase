'use client'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase/config';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState(null);


    const handleSignUp = async (e) => {
        e.preventDefault();

      if(password !== repassword) {
        setError("Passwords don't match");
        return;
    }

      try {
          const res = await createUserWithEmailAndPassword(auth, email, password)
          console.log({res});
          sessionStorage.setItem('user', true);
          setEmail('');
          setPassword('');
          setRepassword('');
          setError(null);
  
      } catch(e){
          console.error(e);
          setError("Sign up failed")
      }
    }
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
      {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
            )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="space-y-4"
      >
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
        <input 
          type="password" 
          placeholder="Re-Enter Password" 
          value={repassword} 
          onChange={(e) => setRepassword(e.target.value)} 
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
        />

        <button 

          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp;
