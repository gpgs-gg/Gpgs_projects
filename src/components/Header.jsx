import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMenu = () => {
      mobileMenu?.classList.toggle("hidden");
    };

    mobileMenuButton?.addEventListener("click", toggleMenu);

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        mobileMenu?.classList.add("hidden");
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    // Add scroll effect to navigation
    const nav = document.querySelector("nav");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        nav?.classList.add("bg-white", "shadow-lg");
      } else {
        nav?.classList.remove("shadow-lg");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Add animation to cards when they come into view
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

    // Add click-to-call functionality
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

    // Cleanup listeners on unmount
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
    <>
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">
                <img className="w-[250px]" src="https://gpgs.in/wp-content/themes/paying_guest/images/logo.png" alt="" />
                {/* <i className="fas fa-home mr-2"></i>Gopal's Paying Guest
                Services */}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                About us
              </a>
             
              <a
                href="#pricing"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                Pricing
              </a>
              <a
                href="#locations"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                Locations
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"              >
                Contact Us
              </a>
               <Link
                to="/gallary"
                className="text-gray-700 hover:text-indigo-600 transition duration-300"
              >
              Gallary
              </Link>
              <Link
                to="gpgs-actions"
                className="text-gray-700 px-4 py-2 rounded-lg  transition duration-300"
              >
                Office Use Only
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button id="mobile-menu-button" className="text-gray-700">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" className="md:hidden hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Home
            </a>
            <a
              href="#services"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Services
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Pricing
            </a>
            <a
              href="#locations"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Locations
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
