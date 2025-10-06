// // pages/LoginPage.js
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useClientDetails, useEmployeeDetails } from './services';
// import CryptoJS from 'crypto-js';
// import { SECRET_KEY } from '../Config'; // Make sure this is defined and matches backend
// import SignupPage from './SignupPage';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const { data: userData, isLoading } = useEmployeeDetails();

//   // const { data: clientData, isLoading:isClientLoading } = useClientDetails();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Normalize user data
//   const normalizedUsers = (userData?.data || []).map(user => ({
//     id: user["ID"],
//     name: user["Name"],
//     role: user["Department"],
//     loginId: user["Login ID"] || user["LoginID"], // handle both key formats
//     password: user["Password"], // This is assumed to be encrypted
//   }));

//   // Decrypt password
//   const decrypt = (encryptedText) => {
//     try {
//       const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
//       return bytes.toString(CryptoJS.enc.Utf8); // return decrypted plain text
//     } catch (err) {
//       console.error("❌ Decryption failed:", err);
//       return '';
//     }
//   };

//   // Handle login submission
//   const onSubmit = (data) => {
//     const inputLoginId = data.loginId.trim();
//     const inputPassword = data.password.trim();

//     const user = normalizedUsers.find(u => {
//       const decryptedPassword = decrypt(u.password);
//       return (
//         u.loginId?.trim().toLowerCase() === inputLoginId.toLowerCase() &&
//         decryptedPassword === inputPassword
//       );
//     });
//     if (user) {
//       login(user);
//        toast.success("Logged in successfully!", {
//           toastId: "login-success" // Optional: prevents duplicate toasts
//         });

//       setError('');
//       navigate('/gpgs-actions');
//       reset();
//         setTimeout(() => {
//            window.location.reload();
//       }, 1000);
//    // To refresh state across the app
//     } else {
//       setError('');
//       toast.error('Invalid Login ID or Password')

//     }
//   };

//   return (
//     <>
//       <div className="flex items-center bg-[#F8F9FB] justify-center min-h-screen bg-primary-light">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">
//             Employee Login
//           </h2>

//           {/* Login ID */}
//           <input
//             type="text"
//             placeholder="Login ID"
//             {...register('loginId', { required: 'Login ID is required' })}
//             className="w-full mb-2 p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
//           />
//           {errors.loginId && (
//             <p className="text-red-600 text-sm mb-2">{errors.loginId.message}</p>
//           )}

//           {/* Password Field with Toggle */}
//           <div className="relative w-full mb-4">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               {...register('password', { required: 'Password is required' })}
//               className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-2 text-gray-600 hover:text-orange-500"
//               tabIndex={-1}
//             >
//               {showPassword ? (
//                 <i className="fas fa-eye-slash"></i>
//               ) : (
//                 <i className="fas fa-eye"></i>
//               )}
//             </button>
//             {errors.password && (
//               <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Change Password Link */}
//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             className="rounded-md font-sm text-sm text-gray-600 hover:text-orange-500 mb-4 underline"
//           >
//             Change your password
//           </button>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-orange-300 text-black p-2 rounded hover:bg-orange-400 transition"
//           >
//             Login
//           </button>

//           {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
//         </form>

//         {/* Password change modal */}
//         <SignupPage isOpen={isOpen} setIsOpen={setIsOpen} />
//       </div>
//     </>
//   );
// };

// export default LoginPage;




// pages/LoginPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClientDetails, useEmployeeDetails } from './services';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../Config'; // Ensure this is defined and matches backend
import SignupPage from './SignupPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData, isLoading: isEmpLoading } = useEmployeeDetails();
  const { data: clientData, isLoading: isClientLoading } = useClientDetails();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Normalize employee data
  const normalizedUsers = (userData?.data || []).map(user => ({
    id: user["ID"],
    name: user["Name"],
    role: user["Role"],
    loginId: user["Login ID"] || user["LoginID"],
    password: user["Password"],
  }));

  // Normalize client data
  const normalizedClients = (clientData?.data || []).map(client => ({
    clientID: client["ClientID"],
    name: client["Name"],
    loginId: client["LoginID"],
    password: client["Password"],
    IsActive: client["IsActive"],
    role: client["Role"],
    propertyCode: client["PropertyCode"],
    doj: client["DOJ"],
    actualDoj: client["ActualDOJ"],
    isActive: client["IsActive"],
    id: client["ID"],
    temporaryPropCode: client["TemporaryPropCode"],
    bloodGroup: client["BloodGroup"],
    occupation: client["Occupation"],
    organisation: client["Organisation"],
    calling: client["CallingNo"],
    whatsAppNo: client["WhatsAppNo"],
    dob: client["DOB"],
    emgyCont1FullName: client["EmgyCont1FullName"],
    emgyCont1No: client["EmgyCont1No"],
    emgyCont2FullName: client["EmgyCont2FullName"],
    emgyCont2No: client["EmgyCont2No"],


  }));
  // Decrypt password
  const decrypt = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error("❌ Decryption failed:", err);
      return '';
    }
  };

  // Handle login
  const onSubmit = (data) => {
    const inputLoginId = data.loginId.trim();
    const inputPassword = data.password.trim();

    // Try matching employee
    const matchedEmployee = normalizedUsers.find((user) => {
      const decryptedPassword = decrypt(user.password);
      return (
        user.loginId?.trim().toLowerCase() === inputLoginId.toLowerCase() &&
        decryptedPassword === inputPassword
      );
    });

    // If no match in employee, check if client matches and is active
    const matchedClient = !matchedEmployee && normalizedClients.find((client) => {
      const decryptedPassword = decrypt(client.password);
      return (
        client.loginId?.trim().toLowerCase() === inputLoginId.toLowerCase() &&
        decryptedPassword === inputPassword &&
        client.IsActive.toLowerCase() === "yes" // ✅ Must be active
      );
    });

    // Additional check: client matches credentials but is NOT active
    const inactiveClient = !matchedEmployee && normalizedClients.find((client) => {
      const decryptedPassword = decrypt(client.password);
      return (
        client.loginId?.trim().toLowerCase() === inputLoginId.toLowerCase() &&

        decryptedPassword === inputPassword &&
        client.IsActive !== "Yes"
      );
    });

    const user = matchedEmployee || matchedClient;

    if (user) {
      login(user); // Save to context or session
      toast.success("Logged in successfully!", { toastId: "login-success" });
      setError('');
      localStorage.setItem('loginTimestamp', Date.now());
      window.location.reload();
      reset();
    } else if (inactiveClient) {
      setError('');
      toast.dismiss();
      toast.error("You don't have permission to log in. Please contact Administrator.", {
        toastId: 'inactive-client',
      });
    } else {
      setError('');
      toast.dismiss();
      toast.error('Invalid Login ID or Password', {
        toastId: 'login-error',
      });
    }
  };



  return (
    <>
      <div className="flex items-center bg-[#F8F9FB] justify-center min-h-screen bg-primary-light">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold  text-orange-500 ">
            Login to your account
          </h2>
          <p className='pb-5'>
            Enter your login ID / Email ID below to login to your account</p>

          {/* Login ID */}
          <input
            type="text"
            placeholder="Enter Login ID"
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
              {...register('password', {
                required: 'Password is required',
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length === 0) return 'Password cannot be empty spaces';
                  if (trimmed.length < 6) return 'Password must be at least 6 characters';
                  return true;
                }
              })}
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
          Create / Change Password
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-lg tracking-wider bg-orange-300 text-black p-2 rounded hover:bg-orange-400 transition"
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
