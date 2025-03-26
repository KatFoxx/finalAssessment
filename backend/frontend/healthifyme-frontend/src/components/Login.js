import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'


function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ username: "", password: "" })
    const [, setCookie] = useCookies(['user'])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
            const user = await response.json();
            console.log(user)
            if (response.ok) {
                setCookie('user', user, {
                    path: "/"
                });
                navigate("/workout")
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <main>
            <form name="loginForm" aria-label="Login Form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={data.username} onChange={handleChange}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={data.password} onChange={handleChange}></input>
                <button type="submit" name="submit">Login</button>
            </form>
        </main>
    )
}

export default Login;