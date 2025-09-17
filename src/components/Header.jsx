import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from "../context/AuthContext";
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from "../Config";
import gpgsLogo from "../logo/Gpgs-logo.jpg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [decryptedUser, setDecryptedUser] = useState(null);

  const location = useLocation();
  const { logout } = useAuth();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) { // md breakpoint ~768px
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

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

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> 
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-12 sm:h-16 md:h-20 w-auto"
                src={gpgsLogo}
                alt="GPGS Logo"
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex space-x-8 items-center">
            {isHomePage ? (
              <>
                <a href="#home" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
                <a href="#services" className="text-gray-700 hover:text-indigo-600 transition">Services & Facilities</a>
                <a href="#locations" className="text-gray-700 hover:text-indigo-600 transition">Locations</a>
                <Link to="/gallery" className="text-gray-700 hover:text-indigo-600 transition">Gallery</Link>
                <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">About Us</a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition">Contact Us</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
                <Link to="/services" className="text-gray-700 hover:text-indigo-600 transition">Services & Facilities</Link>
                <Link to="/locations" className="text-gray-700 hover:text-indigo-600 transition">Locations</Link>
                <Link to="/gallery" className="text-gray-700 hover:text-indigo-600 transition">Gallery</Link>
                <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">About Us</Link>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact Us</Link>
              </>
            )}
            <Link to="/gpgs-actions" className="text-gray-700 hover:text-indigo-600 transition">Office</Link>

            {/* User info + logout on desktop */}
            {decryptedUser && (
              <div className="flex items-center space-x-4 ml-6">
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{decryptedUser.name}</div>
                  <div className="text-xs text-gray-500">({decryptedUser.role})</div>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {decryptedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button onClick={handleLogout} className="text-gray-700 hover:text-indigo-600 transition text-sm">Logout</button>
              </div>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            {decryptedUser && (
              <div className="mr-3 text-center">
                <div className="text-sm font-bold text-gray-900">{decryptedUser.name}</div>
                <div className="text-xs text-gray-500">({decryptedUser.role})</div>
              </div>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-6 space-y-5">
          {isHomePage ? (
            <>
              <a onClick={() => setMenuOpen(false)} href="#home" className="block text-gray-700 hover:text-indigo-600">Home</a>
              <a onClick={() => setMenuOpen(false)} href="#services" className="block text-gray-700 hover:text-indigo-600">Services & Facilities</a>
              <a onClick={() => setMenuOpen(false)} href="#locations" className="block text-gray-700 hover:text-indigo-600">Locations</a>
              <a onClick={() => setMenuOpen(false)} href="#about" className="block text-gray-700 hover:text-indigo-600">About Us</a>
              <a onClick={() => setMenuOpen(false)} href="#contact" className="block text-gray-700 hover:text-indigo-600">Contact Us</a>
            </>
          ) : (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
              <Link onClick={() => setMenuOpen(false)} to="/services" className="block text-gray-700 hover:text-indigo-600">Services & Facilities</Link>
              <Link onClick={() => setMenuOpen(false)} to="/locations" className="block text-gray-700 hover:text-indigo-600">Locations</Link>
              <Link onClick={() => setMenuOpen(false)} to="/gallery" className="block text-gray-700 hover:text-indigo-600">Gallery</Link>
              <Link onClick={() => setMenuOpen(false)} to="/about" className="block text-gray-700 hover:text-indigo-600">About Us</Link>
              <Link onClick={() => setMenuOpen(false)} to="/contact" className="block text-gray-700 hover:text-indigo-600">Contact Us</Link>
            </>
          )}
          <Link onClick={() => setMenuOpen(false)} to="/gpgs-actions" className="block text-gray-700 hover:text-indigo-600">Office</Link>
          {decryptedUser && (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-indigo-600">Logout</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
