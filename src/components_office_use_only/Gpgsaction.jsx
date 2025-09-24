import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from "../Config";


const Gpgsaction = () => {
  const [showSalesOptions, setShowSalesOptions] = useState(false);
  const [decryptedUser, setDecryptedUser] = useState(null);


 useEffect(() => {
    const encrypted = localStorage.getItem('user');
    if (encrypted) {
      setDecryptedUser(decryptUser(encrypted));
    }
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

    useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
if(decryptedUser?.role === "client"){
  return  <div className='flex border border-red-500 justify-center text-center items-center h-screen'>

      <Link to="/gpgs-actions/tickets">
          <div
            className="bg-white  w-64 shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border flex flex-col items-center"
          
          >
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <i className="fa-solid fa-ticket text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">TICKETS SYSTEM</h3>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition">
              Go For Tickets System
            </button>
          </div>
        </Link>
  </div>
  


}



  return (
    <section className="bg-gray-200  mt-20 md:mt-0  min-h-screen py-10 px-4 md:px-6 flex items-start justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full h-screen justify-center items-center max-w-6xl">
        {/* 🟢 TICKETS SYSTEM */}
        <Link to="/gpgs-actions/tickets">
          <div
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border flex flex-col items-center"
            data-aos="fade-up"
          >
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <i className="fa-solid fa-ticket text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">TICKETS SYSTEM</h3>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition">
              Go For Tickets System
            </button>
          </div>
        </Link>

        {/* 🟡 SALES */}
        <div
          className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border flex flex-col items-center"
          data-aos="fade-up"
          onClick={() => setShowSalesOptions(prev => !prev)}
        >
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4">
            <i className="fa-solid fa-chart-line text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">SALES</h3>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 transition mb-4">
            {showSalesOptions ? 'Hide Sales Options' : 'Show Sales Options'}
          </button>

          {/* Sales nested options */}
          {showSalesOptions && (
            <div className="w-full flex flex-col gap-3">
                <Link
                to="/gpgs-actions/beds-avilable"
                className="bg-green-100 text-green-800 py-2 px-4 rounded-md text-center hover:bg-green-200 transition text-sm"
              >
                🛏️ Bed Status
              </Link>
              <Link
                to="/gpgs-actions/new-booking"
                className="bg-indigo-100 text-indigo-800 py-2 px-4 rounded-md text-center hover:bg-indigo-200 transition text-sm"
              >
                ➕ New Booking
              </Link>
            
            </div>
          )}
        </div>

        {/* 🟢 ACCOUNTS */}
        <Link to="/gpgs-actions/accounts">
          <div
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border flex flex-col items-center"
            data-aos="fade-up"
          >
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <i className="fa-solid fa-file-invoice text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">ACCOUNTS</h3>
            <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition">
              Go For Accounts
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Gpgsaction;
