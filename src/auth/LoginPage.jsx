// pages/LoginPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmployeeDetails } from './services';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../Config'; // Make sure this is defined and matches backend
import SignupPage from './SignupPage';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData, isLoading } = useEmployeeDetails();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Normalize user data
  const normalizedUsers = (userData?.data || []).map(user => ({
    id: user["ID"],
    name: user["Name"],
    role: user["Department"],
    loginId: user["Login ID"] || user["LoginID"], // handle both key formats
    password: user["Password"], // This is assumed to be encrypted
  }));

  // Decrypt password
  const decrypt = (encryptedText) => {
    console.log("encryptedText", encryptedText);
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8); // return decrypted plain text
    } catch (err) {
      console.error("❌ Decryption failed:", err);
      return '';
    }
  };

  // Handle login submission
  const onSubmit = (data) => {
    const inputLoginId = data.loginId.trim();
    const inputPassword = data.password.trim();

    const user = normalizedUsers.find(u => {
      const decryptedPassword = decrypt(u.password);
      console.log("decryptedPassword", decryptedPassword);
      return (
        u.loginId?.trim().toLowerCase() === inputLoginId.toLowerCase() &&
        decryptedPassword === inputPassword
      );
    });
  console.log("user found:", user);
    if (user) {
      login(user);
      setError('');
      navigate('/gpgs-actions');
      reset();
      window.location.reload(); // To refresh state across the app
    } else {
      setError('Invalid Login ID or Password');
    }
  };

  return (
    <>
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

          {/* Password Field with Toggle */}
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600 hover:text-orange-500"
              tabIndex={-1}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Change Password Link */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-md font-sm text-sm text-gray-600 hover:text-orange-500 mb-4 underline"
          >
            Change your password
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-300 text-black p-2 rounded hover:bg-orange-400 transition"
          >
            Login
          </button>

          {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
        </form>

        {/* Password change modal */}
        <SignupPage isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default LoginPage;
