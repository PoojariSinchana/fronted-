import React, { useState } from 'react';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      toast.success('Logged in');
      nav('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button className="btn" type="submit">Login</button>
    </form>
  );
}
