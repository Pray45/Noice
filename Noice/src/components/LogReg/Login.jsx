import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Songwave from '../loading/Songwave.jsx';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/api/user/login', input);

      if (res.data.success) {
        const userId = res.data.userId;
        const userName = res.data.userName;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('loggedIn', "true");
        setLoading(false);
        window.location.href = '/';
      } else {
        setLoading(false);
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return loading ? (
    <div className='bg-[#1e1b2e] flex justify-center items-center w-full min-h-screen absolute right-0 text-white'>
      <Songwave />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <form onSubmit={handleLogin} className="bg-[#2a2540] p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" autoComplete="email" className="w-full p-2 mb-4 bg-[#1e1b2e] rounded" onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} required />
        <input type="password" placeholder="Password" autoComplete="current-password" className="w-full p-2 mb-4 bg-[#1e1b2e] rounded" onChange={(e) => setInput({ ...input, password: e.target.value })} value={input.password} required />
        <button type="submit" className="w-full bg-purple-700 p-2 rounded hover:bg-purple-600 cursor-pointer">Login</button>
        <p className="mt-4 text-sm text-center">Don't have an account? 
          <Link to="/register" className="text-purple-400 underline ml-1">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;