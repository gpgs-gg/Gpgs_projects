// components/PublicRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../Config';

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const encryptedUser = localStorage.getItem('user');
    const auth = localStorage.getItem('auth') === 'true';

    if (auth && encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(decrypted);
        setIsAuthenticated(!!user?.loginId);
      } catch (err) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // ⏳ Show nothing or a loader until auth check is done
  if (isAuthenticated === null) return null;

  // ✅ If already logged in, redirect away from login page
  if (isAuthenticated) {
    return <Navigate to="/gpgs-actions" replace />;
  }

  // ❌ If not logged in, show the login page
  return children;
};

export default PublicRoute;
