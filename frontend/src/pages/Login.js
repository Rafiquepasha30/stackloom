import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import Logo from '../assests/stack_loom.png'
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userId", res.data.id);

            // Redirect based on role
            if (res.data.role === "admin") {
                navigate("/admin");  // Make sure route matches App.js
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={Logo} alt="Logo" className="logo" />
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email or Phone"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                <Link to="/forgot-password">Forgot Password?</Link>
                <Link to="/register">Create an Account!</Link>
            </div>
        </div>
    );
};

export default Login;
