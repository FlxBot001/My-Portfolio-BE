import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false); // Add loading state
  const [message, setMessage] = useState(''); // Add message state
  const [stage, setStage] = useState(1); // Add stage state
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


  const handleNext = () => {
    if (stage === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError('Invalid email format');
        setTimeout(() => {
          setError('');
        }, 3000); // remove error after 3 seconds
        return;
      }
      setStage(2);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.message === 'User already exists') {
        setError('User already exists');
        setTimeout(() => {
          setError('');
        }, 3000); // remove error after 3 seconds
        router.push('/auth/signin'); // Redirect to login page
      } else if (data.error) {
        setError('Error creating account');
        setTimeout(() => {
          setError('');
        }, 3000); // remove error after 3 seconds
      } else {
        setMessage(`Account created successfully, ${form.username}`);
        setTimeout(() => {
          setMessage('');
          router.push('/auth/signin'); // Redirect to login page
        }, 3000); // remove message after 3 seconds
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setTimeout(() => {
        setError('');
      }, 3000); // remove error after 3 seconds
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign Up Create Admin</div>
        <form className="form" onSubmit={handleSubmit}>
          {stage === 1 && (
            <>
              <input
                className='input'
                placeholder="Enter username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="input"
                placeholder="Enter email address"
                name="email"
                onChange={handleChange}
                value={form.email}
                required
              />
              <button type="button" className="login-button" onClick={handleNext}>
                Next
              </button>
            </>
          )}
          {stage === 2 && (
            <>
              <input
                className='input'
                placeholder="Enter password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                className='input'
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                className="login-button"
                type="submit"
              >
                Sign Up
              </button>
            </>
          )}
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>
        {/* <p>
          <a href="/auth/signin">Login</a>, or <a href="/auth/forgotp">forgot password</a>.
        </p> */}
      </div>
    </div>
  );
};

export default Signup;