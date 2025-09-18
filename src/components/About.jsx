import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import bed7 from "../images_of_male_pg/photo7.jpeg"
import bed14 from "../images_of_male_pg/photo14.jpeg"
import bed15 from "../images_of_male_pg/photo15.jpeg"
import bed18 from "../images_of_male_pg/photo18.jpeg"


import gbed2 from "../images_of_female_pg/photo2.jpeg"

import gbed7 from "../images_of_female_pg/photo7.jpeg"

import gbed18 from "../images_of_female_pg/photo18.jpeg"
import gbed25 from "../images_of_female_pg/photo25.jpeg"
import gbed26 from "../images_of_female_pg/photo26.jpeg"
import gbed30 from "../images_of_female_pg/photo30.jpeg"






const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#407105] mb-4">About Us</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Box: Gradient Background Section */}
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 sm:p-10">
              <div className="space-y-6 text-white">

                {/* Who are we */}
                <div data-aos="fade-up">
                  <div className="bg-white rounded-xl p-6 shadow-lg ">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Who are we?</h4>
                    <p className="text-base text-gray-700">
                      We are a team of dedicated and qualified professionals with 10+ years of experience
                      in accommodation and maintenance services. Our structured departments and refined
                      processes ensure the best possible experience for our residents
                    </p>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div data-aos="fade-up">
                  <div className="bg-white rounded-xl p-6 shadow-lg ">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Our Mission & Vision</h4>
                    <p className="text-base text-gray-700">
                      We believe in providing comfortable homes for everyone — creating spaces that feel just
                      like your own. We serve beyond business with prompt issue resolutions and professional
                      services tailored to every need
                    </p>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div data-aos="fade-up">
                  <div className="bg-white rounded-xl p-6 shadow-lg text-gray-900">
                    <h4 className="text-xl font-semibold mb-6 flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-2"></i> Why Choose Us?
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 list-disc list-inside text-sm text-gray-800">
                      <li>Non-Compromising Service <span  className='ml-5'>Quality</span></li>
                      <li>Daily Housekeeping</li>
                      <li>Prime Residential Locations</li>
                      <li>In-house Maintenance Team</li>
                      <li>Safe & Secure Premises</li>
                      <li>In-house Customer Support Team</li>
                      <li>Branded Furniture & Appliances</li>
                      <li>Scheduled Appliances Servicing</li>
                      <li>Transparent Pricing</li>
                      <li>Quarterly Deep Cleaning & Pest <span  className='ml-5'>Control</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 p-4 sm:p-6 rounded-xl shadow-lg text-center w-28 sm:w-32">
              <p className="text-2xl font-bold text-indigo-900">10+</p>
              <p className="text-indigo-800 font-semibold text-sm">Years Experience</p>
            </div>
          </div>
  <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
            {/* <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-map-marker-alt text-purple-600 mr-3"></i>Locate us on Map
            </h3> */}

            {/* Swiper Carousel */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 1000 }}
                loop={true}
                slidesPerView={1}
              >
                {[bed18 , gbed26 , bed7 ,gbed7, bed14 , bed15 , gbed2 ,gbed18 , gbed25 , gbed30 ].map((imgSrc, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={imgSrc}
                      alt={`Location ${idx + 1}`}
                      className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Info Box */}
            <div className="bg-white p-6 rounded-lg text-center">
              <i className="fas fa-city text-purple-600 text-3xl md:text-4xl mb-4"></i>
              <p className="font-medium text-gray-900 text-base md:text-lg">Multiple Prime Locations</p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Contact us for specific locations in Navi Mumbai
              </p>
            </div>

              <div data-aos="fade-up" className='mt-10'>
            <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-500 shadow">
              <p className="text-gray-700 italic text-base sm:text-lg">
                "We believe that a comfortable home environment is essential for success, whether you're a
                student or a working professional. That's why we go beyond business to create spaces that feel
                like home"
              </p>
            </div>
          </div>
          </div>
          {/* Right Box: Quote */}
        
         
        </div>
      </div>
    </section>
  );
};

export default About;
