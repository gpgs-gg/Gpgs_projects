import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePassword, useGetOtp, useVerifyOtp } from './services';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../Config';
import LoaderPage from '../components_office_use_only/NewBooking/LoaderPage';
import { toast } from 'react-toastify';

const SignupPage = ({ isOpen, setIsOpen, userData, clientData }) => {
  const { mutate: changePassword, isPending: isChange } = useChangePassword();
  const { mutate: getOtp, isPending: isGettingOtp } = useGetOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const [step, setStep] = useState(1);
  const [emailMatched, setEmailMatched] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const password = watch('password');


  // console.log(11111,  clientData?.data?.find((client) => client.LoginID === trimmedEmail));


  const handleGetOtp = ({ loginId }) => {
    const trimmedEmail = loginId?.trim()?.toLowerCase();
    

   
    const foundUser =
      userData?.data.find((user) => user?.LoginID?.trim()?.toLowerCase() === trimmedEmail) ||
      clientData?.data?.find((client) => client.LoginID?.trim()?.toLowerCase() === trimmedEmail)

    if (!foundUser) {
      toast.dismiss()
      toast.error('Email is not register. Please check and try again.');
      return;
    }

    // Call getOtp API
    getOtp(
      { email: trimmedEmail },
      {
        onSuccess: () => {
          toast.dismiss()
          toast.success('OTP sent successfully.');
          setEmailMatched(trimmedEmail);
          setStep(2);
        },
        onError: () => {
          toast.dismiss()
          toast.error('Failed to send OTP. Try again.');
        },
      }
    );
  };

const handleVerifyOtp = ({ otp }) => {
  verifyOtp(
    {
      email: emailMatched, otp: otp?.trim()
    },
    {
      onSuccess: () => {
        toast.success('OTP verified.');
        setStep(3);
      },
      onError: () => {
        toast.error('Invalid OTP. Please try again.');
      },
    }
  );
};


  const handleUpdatePassword = ({ password }) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password.trim(), SECRET_KEY).toString();

    const payload = {
      LoginID: emailMatched,
      Password: encryptedPassword,
    };

    changePassword(payload, {
      onSuccess: () => {
        toast.success('Password updated successfully.');
        reset();
        setStep(1);
        setIsOpen(false);
      },
      onError: () => {
        toast.error('Failed to update password.');
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-lg w-full max-w-lg h-auto p-6 relative`}>
        {/* Close Button */}
        <button
          onClick={() => {
            setIsOpen(false);
            setStep(1);
            reset();
          }}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-5 text-orange-600">
          {step === 1 ? 'OTP Verification' : step === 2 ? 'Verify OTP' : 'Set New Password'}
        </h2>

        {/* Step 1: Enter Email */}
          {step <=2&& (
          <form onSubmit={handleSubmit(handleGetOtp)} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Email ID </label>
              <input
                type="text"
                {...register('loginId', { required: 'Email ID is required' })}
                placeholder="Enter your email id"
                className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.loginId && (
                <p className="text-red-500 text-sm mt-1">{errors.loginId.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isGettingOtp}
              className="w-full bg-orange-300 hover:bg-orange-400 font-semibold py-2  px-4 rounded-md"
            >
              {isGettingOtp ?<div className='flex justify-center items-center gap-2'>
               <LoaderPage  className="w-4 h-4 mt-10"/> Sending OTP...
              </div> : 'Get OTP'}
            </button>
          </form>
           )}

        {/* Step 2: Enter OTP */}
         {step <= 2 && ( 
          <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1 mt-5">OTP</label>
              <input
                type="text"
                {...register('otp')}
                placeholder="Enter the OTP sent to your email"
                className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifyingOtp}
              className="w-full bg-orange-300 hover:bg-orange-400 font-semibold py-2 px-4 rounded-md"
            >
              {isVerifyingOtp ? <LoaderPage /> : 'Verify OTP'}
            </button>
          </form>
        )} 





        {/* Step 3: Set New Password */}
        {step === 3 && (
          <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-4 flex flex-col justify-evenly  h-auto">
            {/* New Password */}
         
            <div>
              <label className="block text-[16px] font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => {
                      const trimmed = value.trim();
                      if (trimmed.length === 0) return 'Password cannot be empty spaces';
                      if (trimmed.length < 6) return 'Password must be at least 6 characters';
                      return true;
                    },
                  })}
                  placeholder="New password"
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
              <label className="block text-[16px] font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  placeholder="Confirm password"
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
              disabled={isChange}
              className="w-full bg-orange-300 hover:bg-orange-400 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isChange ? <>
              <LoaderPage /> Submit...
              </> : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;

