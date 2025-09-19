import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Gpgsaction = () => {
  const [showSalesOptions, setShowSalesOptions] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  return (
    <section className="bg-gray-200 max-w-f py-16 flex flex-col justify-center items-center h-screen px-6">
      {/* Cards Container */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
       {/* ticket system */}

       <Link to="/gpgs-actions/tickets">
          <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <i className="fa-solid fa-file-invoice text-2xl"></i>          </div>
            <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
              TICKETS SYSTEM
            </h3>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Go For Tickets System
            </button>
          </div>
        </Link >

        <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border"
          onClick={() => setShowSalesOptions(prev => !prev)}
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-6 mx-auto">
            <i className="fa-solid fa-chart-line text-2xl"></i>
          </div>
          <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
            SALES
          </h3>
          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
            {showSalesOptions ? 'Hide Sales Options' : 'Show Sales Options'}
          </button>

          {/* Nested Cards */}
          {showSalesOptions && (
            <div className="mt-6 space-y-4">
              <Link to="/gpgs-actions/new-booking" className="block bg-indigo-100 text-indigo-800 py-3 px-4 rounded-md text-center hover:bg-indigo-200 transition">
                ➕ New Booking
              </Link>
              <Link to="/gpgs-actions/beds-avilable" className="block bg-green-100 text-green-800 py-3 px-4 rounded-md text-center hover:bg-green-200 transition">
                🛏️ Bed Status
              </Link>
              {/* Add more nested options if needed */}
            </div>
          )}
        </div>


        {/* Existing Cards... */}
 


        <Link to="/gpgs-actions/accounts">
          <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <i className="fa-solid fa-file-invoice text-2xl"></i>          </div>
            <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
              ACCOUNTS
            </h3>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Go For Accounts
            </button>
          </div>
        </Link >
        {/* ...Add all the existing Link cards here... */}

        {/* SALES CARD */}

        

      </div>
    </section>
  );
};

export default Gpgsaction;
