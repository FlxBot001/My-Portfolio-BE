import { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState(1);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (stage === 1) {
      const emailRegex = /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.[a-z]{2,})$/;
      if (!emailRegex.test(form.email)) {
        setError('Invalid email format. Only @gmail, @outlook, @hotmail, @yahoo domains are allowed.');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
      setStage(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
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
        }, 3000);
        router.push('/auth/signin');
      } else if (data.error) {
        setError('Error creating account');
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        setMessage(`Account created successfully, ${form.username}`);
        setTimeout(() => {
          setMessage('');
          router.push('/auth/signin');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
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
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </>
          )}
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;