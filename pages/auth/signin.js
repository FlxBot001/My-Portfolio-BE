"use client";

import { set } from "mongoose";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function signin() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Attempt to login using credential provider
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!result.error) {
        // Successfully logged in
        router.push("/");
      } else {
        // Handle sign-in error
        setError("Invalid email or password");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch (error) {
      setError("Sign-in failed, Please try again later");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false); // Reset loading state to false after login attempt fails
      setTimeout(() => {
        setError("");
      }, 4000);
    }


  return <>
  </>;
}}
