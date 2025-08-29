import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMenu = () => {
      mobileMenu?.classList.toggle("hidden");
    };

    mobileMenuButton?.addEventListener("click", toggleMenu);

    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          mobileMenu?.classList.add("hidden"); // Close on click
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
      mobileMenuButton?.removeEventListener("click", toggleMenu);
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleSmoothScroll)
      );
      window.removeEventListener("scroll", handleScroll);
      telLinks.forEach((link) => {
        link.removeEventListener("click", handleTelClick);
      });
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img
              className="w-[250px]"
              src="https://gpgs.in/wp-content/themes/paying_guest/images/logo.png"
              alt="GPGS Logo"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 transition duration-300">Home</a>
            <a href="#services" className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition duration-300">About us</a>
            <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition duration-300">Pricing</a>
            <a href="#locations" className="text-gray-700 hover:text-indigo-600 transition duration-300">Locations</a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition duration-300">Contact Us</a>
            <Link to="/gallary" className="text-gray-700 hover:text-indigo-600 transition duration-300">Gallery</Link>
            <Link to="/gpgs-actions" className="text-gray-700 hover:text-indigo-600 transition duration-300">Office Use Only</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button id="mobile-menu-button" className="text-gray-700 focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="md:hidden hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-2">
        <a href="#home" className="block text-gray-700 hover:text-indigo-600">Home</a>
        <a href="#services" className="block text-gray-700 hover:text-indigo-600">Services</a>
        <a href="#about" className="block text-gray-700 hover:text-indigo-600">About us</a>
        <a href="#pricing" className="block text-gray-700 hover:text-indigo-600">Pricing</a>
        <a href="#locations" className="block text-gray-700 hover:text-indigo-600">Locations</a>
        <a href="#contact" className="block text-gray-700 hover:text-indigo-600">Contact</a>
        <Link to="/gallary" className="block text-gray-700 hover:text-indigo-600">Gallery</Link>
        <Link to="/gpgs-actions" className="block text-gray-700 hover:text-indigo-600">Office Use Only</Link>
      </div>
    </nav>
  );
};

export default Header;
