import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '' });

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://noice-2ed8.onrender.com/api/user/login', input, {withCredentials: true});

      if (res.data.success) {
        const userId = res.data.userId;
        localStorage.setItem('userId', userId);
        window.localStorage.setItem('loggedIn', "true");
        navigate('/');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <form onSubmit={handleLogin} className="bg-[#2a2540] p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" autoComplete="email" className="w-full p-2 mb-4 bg-[#1e1b2e] rounded" onChange={(e) => setInput({ ...input, email: e.target.value })} required />
        <input type="password" placeholder="Password" autoComplete="current-password" className="w-full p-2 mb-4 bg-[#1e1b2e] rounded" onChange={(e) => setInput({ ...input, password: e.target.value })} required />
        <button type="submit" className="w-full bg-purple-700 p-2 rounded hover:bg-purple-600">Login</button>
        <p className="mt-4 text-sm text-center">Don't have an account? 
          <Link to="/register" className="text-purple-400 underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;