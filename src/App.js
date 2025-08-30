import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Pricing from './components/Pricing';
import Location from './components/Location';
import Contact from './components/Contact';
import Gpgsaction from './Gpgs_Components/Gpgsaction';
import Gallary from './components/Gallary';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Smooth scrolling
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMenuOpen(false); // close mobile menu after click
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleSmoothScroll));

    return () => {
      anchors.forEach((a) =>
        a.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, [isMenuOpen]);

  // Scroll effect on nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        navRef.current?.classList.add("bg-white", "shadow-lg");
      } else {
        navRef.current?.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for cards
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".card-hover");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Click-to-call animation
  useEffect(() => {
    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    const handleClick = function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    };

    telLinks.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      telLinks.forEach((link) =>
        link.removeEventListener("click", handleClick)
      );
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Services />
            <About />
            <Pricing />
            <Location />
            <Contact />
          </>
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gpgs-actions" element={<Gpgsaction />} />
        <Route path="/gallary" element={<Gallary />} />
      </Routes>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold mb-4">
                <i className="fas fa-home mr-2"></i>Gopal's Paying Guest Services
              </div>
              <p className="text-gray-400 mb-4">We Serve Beyond Business - Enjoy Luxury at the Best Price</p>
              <p className="text-gray-400">Quality paying guest accommodations for professionals and students in Mumbai & Navi Mumbai with all modern amenities and excellent service.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition duration-300">Services</a></li>
                <li><a href="#pricing" className="hover:text-white transition duration-300">Pricing</a></li>
                <li><a href="#locations" className="hover:text-white transition duration-300">Locations</a></li>
                <li><a href="#contact" className="hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li><i className="fas fa-phone mr-2"></i>9326262292</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i>Mumbai & Navi Mumbai</li>
                <li><i className="fas fa-clock mr-2"></i>24/7 Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Premium PG Services. All rights reserved. We Serve Beyond Business.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
