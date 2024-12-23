// pages/auth/signin.js
'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";


export default function signin() {


  const [loading, setLoading] = useState();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const router = useRouter();

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Attempt signin with creadial provider
      const result = await signIn('creadentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
      if (!result.error) {
        // Successful signin
        router.push('/')
      } else {
        // Handle sign-in error
        setError('Invalid Email or Password');
        setTimeout(() => {
          setError('');
        }, 4000);
      }

    } catch (error) {
      // Any other error
      setError('Sign-In failed, try again');
      setTimeout(() => {
        setError('');
      }, 4000);

    } finally {
      setLoading(false);
      setError('');
      setTimeout(() => {
        setError('');
      }, 4000);
    };


  };


  return (
    <>
    </>
  );
}
