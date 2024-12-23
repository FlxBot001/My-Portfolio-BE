'use client';

import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function signin() {

  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

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
      console.error('Sign-in error:', err);
      setError('Sign-In failed, try again');
      setTimeout(() => {
        setError('');
      }, 4000);
    } finally {
      setLoading(false); // Ensures loading is set to false in all cases
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  };

  if (status === 'loading') {
    return <div className="flex flex-center wh_100">
      <Spinner />
    </div>;
  }

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In Admin</div>
          {loading ? <div className="flex flex-center w-100 flex-col"><Spinner /> Checking ...</div> : <>

          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              id="email"
              value={form.email}
              type="email"
              onChange={handleChange}
              name="email"
              className="input"
              placeholder="Enter Your Email"
            />

            <input
              required
              id="password"
              value={form.password}
              type="password"
              onChange={handleChange}
              name="password"
              className="input"
              placeholder="Enter Your Password"
            />

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p className="redcolor">{error}</p>}
          </form>
          <span className="agreement"><a href="https://www.instagram.com/flxnjush/">Learn Admin licence agreement</a></span>
          <p className="agreement">Don't have an account? <a href="/auth/signup">Sign Up</a></p>
          </>}
        </div>
      </div>
    </>
  );
}