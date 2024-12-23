import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const ResetPassword = () => {
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '', confirmNewPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const res = await fetch('/api/auth/resetp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        setMessage('Password reset successfully');
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
    }
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Reset Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className='input'
            placeholder="Enter your email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className='input'
            placeholder="Enter OTP"
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            required
          />
          <input
            className='input'
            placeholder="Enter new password"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <input
            className='input'
            placeholder="Confirm new password"
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            required
          />
          <button className="login-button" type="submit">
            Reset Password
          </button>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>
        <button className="login-button" onClick={handleSignIn}>
          Go to Sign In
        </button>
        {session && (
          <button className="login-button" onClick={handleHome}>
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;