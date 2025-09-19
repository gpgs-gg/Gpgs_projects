import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import bed2 from "../images_of_male_pg/bed2.png"

import bed11 from "../images_of_male_pg/photo11.jpeg"


import gbed1 from "../images_of_female_pg/photo1.jpeg"
import gbed3 from "../images_of_female_pg/photo3.jpeg"

import gbed14 from "../images_of_female_pg/photo14.jpeg"
import gbed15 from "../images_of_female_pg/photo15.jpeg"
import gbed16 from "../images_of_female_pg/photo16.jpeg"
import gbed17 from "../images_of_female_pg/photo17.jpeg"

import gbed20 from "../images_of_female_pg/photo20.jpeg"
import gbed21 from "../images_of_female_pg/photo21.jpeg"
import gbed23 from "../images_of_female_pg/photo23.jpeg"


const Location = () => {
  return (
    <section id="locations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c4d04] mb-4">Prime Locations</h2>
          <p className="text-base md:text-xl text-gray-600">
            Strategically located PG facilities across Mumbai & Navi Mumbai
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4 sm:p-6">
          {/* Card 1 */}
          

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              {/* <i className="fas fa-map-marker-alt text-purple-600 mr-3"></i>Locate us on Map */}
            </h3>

            {/* Swiper Carousel */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 1000 }}
                loop={true}
                slidesPerView={1}
              >
                {[gbed1 , gbed3, gbed20 , gbed14 , gbed15 , gbed16 , gbed17 , gbed21, gbed23 , bed2 , bed11 ].map((imgSrc, idx) => (
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
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <i className="fas fa-city text-purple-600 text-3xl md:text-4xl mb-4"></i>
              <p className="font-medium text-gray-900 text-base md:text-lg">Multiple Prime Locations</p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Contact us for specific locations in Navi Mumbai
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-map-marker-alt text-indigo-600 mr-3"></i>Navi Mumbai, Maharashtra
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Flip Cards */}
              {[
                { title: "Nerul East", sectors: ["Sector 17", "Sector 19", "Sector 21"] },
                { title: "Nerul West", sectors: ["Sector 2", "Sector 14", "Sector 20"] },
                { title: "CBD Belapur", sectors: ["Sector 14", "Sector 19", "Sector 20"] },
                { title: "Kharghar", sectors: ["Sector 3", "Sector 10", "Sector 12"] },
                { title: "Kopar Khairane", sectors: ["Sector 3"] },
                { title: "Ghansoli", sectors: ["Sector 16"] },
              ].map((location, index) => (
                <div key={index} className="relative group w-full h-32 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* Front */}
                    <div className="absolute inset-0 bg-indigo-50 rounded-lg flex flex-col items-center justify-center [backface-visibility:hidden]">
                      <i className="fas fa-building text-indigo-600 text-xl md:text-2xl mb-2"></i>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{location.title}</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 border border-blue-500 bg-white rounded-lg flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <ul className="text-xs md:text-sm text-gray-700 space-y-0.5 text-center">
                        {location.sectors.map((sector, i) => (
                          <li key={i}>{sector}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
    
    <div className="mt-12 flex max-w-[73rem] ml-6  justify-center items-center bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-start space-x-1">
            <i className="fas fa-info-circle text-yellow-600 text-lg md:text-xl mt-[-2px]"></i>
            <div className=''>
              <h4 className="font-semibold text-yellow-800 mb-1 md:mb-2 text-sm md:text-base">Important Note</h4>
              <p className="text-yellow-700 text-sm md:text-base">
                Before you reach any given location, please inform us a minimum of 30 minutes in advance for a smooth visit experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Location;
