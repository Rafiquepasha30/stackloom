import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './TrainerLogin.module.css';

const TrainerLogin = () => {
  const [trainer, setTrainer] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, trainer);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('id', res.data.id);
      navigate('/trainer-panel');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.trainerLoginContainer}>
      <div className={styles.trainerLoginBox}>
        <h2>Trainer Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default TrainerLogin;
