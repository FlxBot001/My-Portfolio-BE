// pages/auth/signup.js

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {

  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  // Authenticate
  // useEffect(() => {
  //   if (status == 'authenticated') {
  //     router.push('/');
  //   }
  // }, [status, router]);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setTimeout(() => {
        setError('');
      }, 3000); // remove error in 3 sec
    } else {
      router.push('/auth/signin');
    }
  };


  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign Up Create Admin</div>

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

            <input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              className="input"
              placeholder="Confirm Password"
            />

            <button className="login-button" type="submit">
              Sign Up
            </button>
            {error && <p>{error}</p>}
          </form>
          <p>Already have an account? <a href="/auth/signin">Sign In</a></p>
        </div>
      </div>
    </>
  );
}

// export default function singup(){
//   return <>

//     <h1>You Don't Have permision to Signup To this Admin Dashboard</h1>

//   </>
// }
