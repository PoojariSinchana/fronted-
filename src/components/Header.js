import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="header">
      <div className="brand"><Link to="/">Snippet Vault</Link></div>
      <nav>
        <Link to="/">Explore</Link>
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={() => { logout(); nav('/'); }} className="link-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
