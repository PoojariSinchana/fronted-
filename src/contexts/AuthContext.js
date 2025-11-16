import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import API from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const tok = localStorage.getItem('token');
    if (!tok) return null;
    try {
      const decoded = jwtDecode(tok);
      return { id: decoded.id };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // optional: fetch profile on load
    async function fetchProfile() {
      if (!user) return;
      try {
        await API.get('/users/me'); // if you add route
        // setUser(res.data.user);
      } catch (err) { /* ignore */ }
    }
    fetchProfile();
  }, [user]);

  const login = (data) => {
    const { token, user } = data;
    localStorage.setItem('token', token);
    setUser(user || { id: jwtDecode(token).id });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
