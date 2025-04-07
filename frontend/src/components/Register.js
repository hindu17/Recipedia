// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/register',
        formData
      );
      const token = res.data.token;
      localStorage.setItem('token', token);
      onAuth(true);
      // Navigate to the main app or dashboard
      navigate('/add-recipe');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try a different username or email.');
    }
  };

  return (
    <>
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
      />
      <p className="mt-3 text-center">
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Login here
        </Link>
      </p>
    </>
  );
};

export default Register;
