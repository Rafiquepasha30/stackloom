import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [admin, setAdmin] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_API_URL}/auth/create-admin`, admin, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data.message))
    .catch(err => alert(err.response.data.message));
  };

  return (
    <div className="mt-4">
      <h3>Create New Admin</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default AdminForm;
