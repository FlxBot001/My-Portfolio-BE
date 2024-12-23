import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/forgotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        setMessage('OTP sent to your email');
        setTimeout(() => {
          setMessage('');
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
        <div className="heading">Forgot Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className='input'
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <button className="login-button" type="submit">
            Send OTP
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

export default ForgotPassword;