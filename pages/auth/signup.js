// pages/auth/signup.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {

  const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});

  const [error, setError] = useState('');

  const router = useRouter();

  // authenticate
  useEffect(() => {

  }, []);


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.confirmPassword){
      setError('Password does not match');
      return;
    } 

    const res = await fetch(`/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if(data.error){
      setTimeout(() => {
        setError('Error creating account');
      }, 3000); // remove error after 3 seconds
      
    } else {
      router.push('/auth/signin');
    }

  }

  return (

    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign Up Create Admin</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder="Enter email address"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              className="input"
              placeholder="Enter password"
              name="password"
            />
            <input
              type="password"
              className="input"
              placeholder="Confirm password"
              name="confirmPassword"
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
