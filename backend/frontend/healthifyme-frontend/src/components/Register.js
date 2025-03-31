import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Register() {

    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: ""
    })
    const [repeatPass, setRepeatPass] = useState("")
    const [, setCookie] = useCookies(['user'])
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    // handle the duplicate Password Change
    const handlePass = (e) => {
        setRepeatPass(e.target.value)
    }
    // handle Change in the Form Data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };
    // Handle Submission, preventing default behaviour, creating a new user, persisting to the DB and logging in.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (repeatPass !== data.password) {
            setMessage("Passwords do not match!")
            return
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`,
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
            const registration = await response.json()
            setMessage(registration)
            if (response.ok) {
                try {
                    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: data.username, password: data.password })
                    })
                    const user = await loginResponse.json();
                    setCookie('user', user, {
                        path: "/"
                    });
                } catch (error) {
                    console.error(error, error.message)
                }
                navigate("/workout")
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        }
    }
    return (
        <main>
            <Helmet>
                <title>Register - HealthifyMe</title>
                <meta
                    name="description"
                    content="Create an account on HealthifyMe. Register with your name, email, username, and password to start your fitness journey."
                />
                <meta
                    name="keywords"
                    content="register, sign up, HealthifyMe, fitness app, create account"
                />
            </Helmet>
            <form aria-label="Register User Form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleChange} value={data.name}></input>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleChange} value={data.email}></input>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={handleChange} value={data.username}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handleChange} value={data.password}></input>
                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input type="password" id="repeatPassword" name="repeatPassword" onChange={handlePass} value={repeatPass}></input>
                <button type="submit" name="register">Register User</button>
            </form>
            <p>{message?.msg || message}</p>
        </main>
    )
}

export default Register;