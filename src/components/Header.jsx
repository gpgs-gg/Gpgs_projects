import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  useEffect(() => {
        AOS.init({
            duration: 1000, // global animation duration
            once: false, // whether animation should happen only once - default true
        });
        AOS.refresh(); // refresh AOS when component mounts or updates
    }, []);
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setMenuOpen(false); // Close mobile menu on link click
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) =>
      anchor.addEventListener("click", handleSmoothScroll)
    );

    const nav = document.querySelector("nav");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        nav?.classList.add("bg-white", "shadow-lg");
      } else {
        nav?.classList.remove("shadow-lg");
      }
    };
    window.addEventListener("scroll", handleScroll);

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".card-hover").forEach((card) => {
      observer.observe(card);
    });

    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    const handleTelClick = function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    };
    telLinks.forEach((link) => {
      link.addEventListener("click", handleTelClick);
    });

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleSmoothScroll)
      );
      window.removeEventListener("scroll", handleScroll);
      telLinks.forEach((link) =>
        link.removeEventListener("click", handleTelClick)
      );
    };
  }, []);

  const handleMobileToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-4 h-20 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-center">
            <img
              className="w-[250px] md:w-[280px] mt-3"
              src="https://gpgs.in/wp-content/themes/paying_guest/images/logo.png"
              alt="GPGS Logo"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8 text-lg mt-3 font-bold">
            {isHomePage ? (
              <>
                <a href="#home" className="text-gray-700 hover:text-indigo-600 transition duration-300">Home</a>
                <a href="#services" className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</a>
                <a href="#about" className="text-gray-700 hover:text-indigo-600 transition duration-300">About us</a>
                <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition duration-300">Pricing</a>
                <a href="#locations" className="text-gray-700 hover:text-indigo-600 transition duration-300">Locations</a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition duration-300">Contact Us</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-indigo-600 transition duration-300">Home</Link>
                <Link to="/services" className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</Link>
                <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition duration-300">About us</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition duration-300">Pricing</Link>
                <Link to="/location" className="text-gray-700 hover:text-indigo-600 transition duration-300">Locations</Link>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition duration-300">Contact Us</Link>
              </>
            )}
            <Link to="/gallary" className="text-gray-700 hover:text-indigo-600 transition duration-300">Gallery</Link>
            <Link to="/gpgs-actions" className="text-gray-700 hover:text-indigo-600 transition duration-300">Office Use Only</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center  text-xl mt-3 font-bold">
            <button onClick={handleMobileToggle} className="text-gray-700 focus:outline-none">
              {menuOpen ? (
                <i className="fas fa-times text-2xl md:text-xl"></i>
              ) : (
                <i className="fas fa-bars text-2xl md:text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div data-aos="fade-left" data-aos-offset="100" data-aos-easing="ease-in-sine" data-aos-duration="500" className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6  text-lg mt-3 font-bold space-y-5">
          {isHomePage ? (
            <>
              <a onClick={handleMenuLinkClick} href="#home" className="block text-gray-700 hover:text-indigo-600">Home</a>
              <a onClick={handleMenuLinkClick} href="#services" className="block text-gray-700 hover:text-indigo-600">Services</a>
              <a onClick={handleMenuLinkClick} href="#about" className="block text-gray-700 hover:text-indigo-600">About us</a>
              <a onClick={handleMenuLinkClick} href="#pricing" className="block text-gray-700 hover:text-indigo-600">Pricing</a>
              <a onClick={handleMenuLinkClick} href="#locations" className="block text-gray-700 hover:text-indigo-600">Locations</a>
              <a onClick={handleMenuLinkClick} href="#contact" className="block text-gray-700 hover:text-indigo-600">Contact</a>
            </>
          ) : (
            <>
              <Link onClick={handleMenuLinkClick} to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
              <Link onClick={handleMenuLinkClick} to="/services" className="block text-gray-700 hover:text-indigo-600">Services</Link>
              <Link onClick={handleMenuLinkClick} to="/about" className="block text-gray-700 hover:text-indigo-600">About us</Link>
              <Link onClick={handleMenuLinkClick} to="/pricing" className="block text-gray-700 hover:text-indigo-600">Pricing</Link>
              <Link onClick={handleMenuLinkClick} to="/location" className="block text-gray-700 hover:text-indigo-600">Locations</Link>
              <Link onClick={handleMenuLinkClick} to="/contact" className="block text-gray-700 hover:text-indigo-600">Contact</Link>
            </>
          )}
          <Link onClick={handleMenuLinkClick} to="/gallary" className="block text-gray-700 hover:text-indigo-600">Gallery</Link>
          <Link onClick={handleMenuLinkClick} to="/gpgs-actions" className="block text-gray-700 hover:text-indigo-600">Office Use Only</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
