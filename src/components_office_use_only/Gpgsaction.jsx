import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
const Gpgsaction = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // global animation duration
      once: false, // whether animation should happen only once - default true
    });
    AOS.refresh(); // refresh AOS when component mounts or updates
  }, []);
  return (
    <section className="bg-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto mt-20 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Take Action with Gopal's PG Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the option that suits you best — whether you want to book your
          perfect stay or learn more about our services. We’re here to help you
          every step of the way.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        {/* <Link> */}
        <Link to="/gpgs-actions/new-booking">
          <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6 mx-auto">
              <i className="fa-solid fa-book text-2xl"></i>          </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              NEW BOOKING
            </h3>
            <p className="text-gray-600 mb-6">
              Dummy text Reserve your bed in just a few clicks. Enjoy premium facilities at
              affordable prices designed for students and working professionals.
            </p>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Go For Booking
            </button>
          </div>
        </Link>

        {/* </Link> */}

        {/* Card 2 */}
        <Link to="/gpgs-actions/beds-avilable">
          <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <i class="fa-solid fa-bed text-2xl"></i>          </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              BEDS AVILABLE
            </h3>
            <p className="text-gray-600 mb-6">
              Discover why Gopal’s PG Services is the trusted choice for comfort,
              convenience, and community living across Mumbai & Navi Mumbai.
            </p>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Go For Beds
            </button>
          </div>
        </Link>


        {/* Card 3 */}

        <Link to="/gpgs-actions/accounts">
          <div className="bg-white shadow-lg cursor-pointer rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <i class="fa-solid fa-file-invoice text-2xl"></i>          </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              ACCOUNTS
            </h3>
            <p className="text-gray-600 mb-6">
              Discover why Gopal’s PG Services is the trusted choice for comfort,
              convenience, and community living across Mumbai & Navi Mumbai.
            </p>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Go For Accounts
            </button>
          </div>
        </Link >
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300 border">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
            <i className="fas fa-info-circle text-2xl"></i>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            LEARN MORE          </h3>
          <p className="text-gray-600 mb-6">
            Discover why Gopal’s PG Services is the trusted choice for comfort,
            convenience, and community living across Mumbai & Navi Mumbai.
          </p>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gpgsaction;
