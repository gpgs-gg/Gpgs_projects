import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePassword } from './services';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../Config';
import LoaderPage from '../components_office_use_only/NewBooking/LoaderPage';

const SignupPage = ({ isOpen, setIsOpen }) => {
const { mutate: changePassword, isPending } = useChangePassword();
  console.log("isPending", isPending);
// Add this to your component state
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 👇 Real-time validation enabled
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange', // ✅ Enables real-time validation
  });

  const password = watch('password');

  const onSubmit = (data) => {
    const { loginId, password } = data;

    // ✅ Encrypt the password using AES
    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

    const payload = {
      LoginID: loginId.trim(),
      Password: encryptedPassword,
    };

    // 🔄 Call mutation to update password
    changePassword(payload, {
      onSuccess: () => {
        alert('✅ Password updated successfully.');
        reset();
        setIsOpen(false);
      },
      onError: (err) => {
        alert('❌ Failed to update password.');
        console.error(err);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-orange-600">Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Login ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login ID</label>
            <input
              type="text"
              {...register('loginId', { required: 'Login ID is required' })}
              placeholder="Enter your Login ID"
              className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.loginId && (
              <p className="text-red-500 text-sm mt-1">{errors.loginId.message}</p>
            )}
          </div>

          {/* New Password */}
     <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your new password"
      {...register('password', {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      })}
      className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-orange-500"
      tabIndex={-1}
    >
      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
    </button>
  </div>
  {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
  )}
</div>

          {/* Confirm Password */}
     <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
  <div className="relative">
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      placeholder="Confirm your new password"
      {...register('confirmPassword', {
        required: 'Please confirm your password',
        validate: (value) =>
          value === password || 'Passwords do not match',
      })}
      className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-orange-500"
      tabIndex={-1}
    >
      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
    </button>
  </div>
  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
  )}
</div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-300 hover:bg-orange-400 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            {isPending ? <LoaderPage/> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
