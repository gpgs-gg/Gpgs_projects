import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Pricing from './components/Pricing';
import Location from './components/Location';
import Contact from './components/Contact';
import Gpgsaction from './components_office_use_only/Gpgsaction';
import Gallary from './components/Gallary';
import BedsAvilable from './components_office_use_only/Gpgps_Bedsavilable/BedsAvilable';
import Accounts from './components_office_use_only/Gpgs_Accounts/Accounts';
import AdminLayout from './components_office_use_only/TicketSystem/AdminLayout';
import NewBooking from './components_office_use_only/Gpgs_NewBooking/NewBooking';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/gpgs-actions/admin");

  // Smooth scroll
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMenuOpen(false);
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleSmoothScroll));

    return () => {
      anchors.forEach((a) =>
        a.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, [isMenuOpen]);

  // Navbar scroll effect
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

  // Card fade-in animation
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

  // Telephone link click effect
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
      {/* Show Header only if not in admin route */}
      {!isAdminRoute && <Header />}

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
        <Route path="/gpgs-actions/beds-avilable" element={<BedsAvilable />} />
        <Route path="/gpgs-actions/new-booking" element={<NewBooking />} />
        <Route path="/gpgs-actions/accounts" element={<Accounts />} />

        {/* Admin routes */}
        <Route path="/gpgs-actions/admin/*" element={
            <AdminLayout />
        } />
      </Routes>
    </>
  );
}

export default App;
