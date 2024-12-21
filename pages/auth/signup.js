import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Signup = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { status } = useSession();
  const router = useRouter();

  // authenticate
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setError('Error creating account');
        setTimeout(() => {
          setError('');
        }, 3000); // remove error after 3 seconds
      } else {
        router.push('/auth/signin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setTimeout(() => {
        setError('');
      }, 3000); // remove error after 3 seconds
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" value={form.password} onChange={handleChange} required />
      <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
      {error && <p>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;