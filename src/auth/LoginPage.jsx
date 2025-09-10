// pages/LoginPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmployeeDetails } from './services';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


  const { data: userData , isLoading } = useEmployeeDetails();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Normalize user data from API
  const normalizedUsers = (userData?.data || []).map(user => ({
    id: user["ID"],
    name: user["Name"],
    role: user["Department"],
    loginId: user["Login ID"],
    password: user["Password"],
  }));

  // ✅ Login logic
  const onSubmit = (data) => {
    const user = normalizedUsers.find(
      u =>
        u.loginId === data.loginId.trim() &&
        u.password === data.password.trim()
    );

    if (user) {
      login(user); // store in context + localStorage
      setError('');
      navigate('/gpgs-actions/tickets');
      reset()
    } else {
      setError('Invalid Login ID or Password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">
          Employee Login
        </h2>

        {/* Login ID */}
        <input
          type="text"
          placeholder="Login ID"
          {...register('loginId', { required: 'Login ID is required' })}
          className="w-full mb-2 p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.loginId && (
          <p className="text-red-600 text-sm mb-2">{errors.loginId.message}</p>
        )}

        {/* Password */}
        <div className="relative w-full mb-4">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
        className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 pr-10"
      />

      {/* Eye button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 text-gray-600 hover:text-orange-500 focus:outline-none"
        tabIndex={-1} // exclude from tab order
      >
        {showPassword ? (
          <i className="fas fa-eye-slash"></i> // Eye closed icon
        ) : (
          <i className="fas fa-eye"></i> // Eye open icon
        )}
      </button>

      {errors.password && (
        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-300 text-black p-2 rounded hover:bg-orange-400 transition"
        >
          Login
        </button>

        {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
