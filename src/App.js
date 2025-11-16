import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import SnippetList from './components/SnippetList';
import SnippetDetail from './components/SnippetDetail';
import SnippetForm from './components/SnippetForm';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<SnippetList />} />
            <Route path="/snippets/:id" element={<SnippetDetail />} />
            <Route path="/create" element={<PrivateRoute><SnippetForm /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><SnippetForm edit /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
