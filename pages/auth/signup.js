// pages/auth/signup.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  // Authenticate
  useEffect(() => {}, []);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password do not match");
      return;
    }

    const res = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) {
      setError('Error happened')
      setTimeout(() => {
        setError('')
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
              name="password"
              className="input"
              placeholder="Enter Your Password"
            />

            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder="Confirm Password"
            />

            <button className="login-button" type="submit">
              Sign Up
            </button>
            {error && <p>{error}</p>}
          </form>
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
