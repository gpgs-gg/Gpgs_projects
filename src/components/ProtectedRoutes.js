// components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
 import CryptoJS from 'crypto-js';
 import { SECRET_KEY } from '../Config';
import { useEffect, useState } from 'react';
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [ decryptedUser , setDecryptedUser] = useState(null);

   useEffect(() => {
      setDecryptedUser(decryptUser(localStorage.getItem('user')))
     ; // Just to verify decryption works
    }, []);
  
    const decryptUser = (encryptedData) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
      } catch (error) {
        console.error('Failed to decrypt user:', error);
        return null;
      }
    };
  // ✅ Check from localStorage directly
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  const user = localStorage.getItem('user');

  if (!isAuthenticated || !user) {
    return <Navigate to="/gpgs-actions/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
