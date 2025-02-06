"use client";

import { signIn, } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    }else{
        router.push('/')
    }
  };



  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AuthButton;
