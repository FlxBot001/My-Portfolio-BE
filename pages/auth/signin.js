'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function signin() {

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
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
      // Attempt signin with credentials provider
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (!result.error) {
        // Successful signin
        router.push('/');
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
    }
  };

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In Admin</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="input"
              placeholder="Enter Your Email"
            />

            <input
              type="password"
              onChange={handleChange}
              name="password"
              className="input"
              placeholder="Enter Your Password"
            />

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p>{error}</p>}
          </form>
          <p>Don't have an account? <a href="/auth/signup">Sign Up</a></p>
        </div>
      </div>
    </>
  );
}