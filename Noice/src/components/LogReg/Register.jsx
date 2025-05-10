import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [input, setInput] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/user/create', input, {withCredentials: true})

    if (res.data.success) {
        toast.success('Registered successfully!');
        navigate('/login');
    }else {
        toast.error(res.data.message || 'Registration failed');
    }
    } catch (error) {
        console.log(error.response);
        toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <form onSubmit={handleRegister} className="bg-[#2a2540] p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 bg-[#1e1b2e] rounded"
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          value={input.username}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-[#1e1b2e] rounded"
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          value={input.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-[#1e1b2e] rounded"
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          value={input.password}
          required
        />
        <button type="submit" className="w-full bg-purple-700 p-2 rounded hover:bg-purple-600">
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
