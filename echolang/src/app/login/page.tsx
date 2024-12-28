"use client"

import { useSession } from 'paket/hooks/use-session';
import React, { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError]= useState<string | null>("");
    const { handleSignIn } = useSession();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || "Failed to log in.");
            }
            handleSignIn(data.token);
            console.log("Login successful" + data.message);
        } catch(err: unknown){
            if(err instanceof Error){
                setError(err.message);
                console.log(err.message);
            } else {
                console.log("Unexpected error: ", err);
                setError("Unexpected error.");
            }
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>
            <button type="submit">Log In</button>
            {error && <div style={{ color: 'red'}}>{error}</div>}
        </form>
    </div>
  )
}