import React, { useState } from 'react';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login(res.data);
      toast.success('Registered');
      nav('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Register</h2>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button className="btn" type="submit">Register</button>
    </form>
  );
}
