import { ReactTyped } from 'react-typed';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import video1 from "../videos/PV1NL21-privateRoom.mp4";
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
    AOS.refresh();
  }, []);

  return (
    <>
      <section id="home" className="gradient-bg text-black py-16 pt-32 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-10">

          {/* Left side: content */}
          <div className="flex-1 w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 mb-4 leading-snug">
              Our goal is to make you feel at home <br />
              in our paying guest facilities with all <br />
              the quality services
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-90">
              <ReactTyped
                strings={["Enjoy Luxurious Stay at Best Price"]}
                typeSpeed={20}
                backSpeed={20}
                loop
              />
            </p>

            <Link
              to="/contact"
              className="bg-green-900 p-3 flex hover:bg-green-800 justify-center items-center rounded-full w-full max-w-md mb-8 space-x-2 group"
            >
              <p className="text-white text-base sm:text-lg md:text-xl transition-all duration-700 group-hover:mr-4">
                Book Your Stay with us today
              </p>
              <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                  className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>

            <div className="flex flex-wrap gap-4 justify-start">
              <div className="bg-white text-[#3730a3] px-6 py-3 rounded-lg font-semibold text-center w-full sm:w-auto">
                <h1 className="text-xl">
                  <CountUp end={10} duration={2} />+
                </h1>
                <p>Years Experience</p>
              </div>

              <div className="bg-white text-[#3730a3] px-6 py-3 rounded-lg font-semibold text-center w-full sm:w-auto">
                <h1 className="text-xl">
                  <CountUp end={4} duration={2.5} separator="," />k+
                </h1>
                <p>Customers</p>
              </div>

              <div className="bg-white text-[#3730a3] px-6 py-3 rounded-lg font-semibold text-center w-full sm:w-auto">
                <h1 className="text-xl">
                  <CountUp end={500} duration={2} separator="," />+
                </h1>
                <p>Reviews</p>
              </div>
            </div>
          </div>

          {/* Right side: video */}
             <div data-aos="fade-up" className="flex-1   flex justify-center md:justify-end">
            <video
              className="h-[500px] lg:h-[500px] mt-7 w-full object-cover rounded-lg "
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
