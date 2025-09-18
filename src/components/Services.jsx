import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import bed3 from "../images_of_male_pg/bed3.png"
import bed5 from "../images_of_male_pg/photo5.jpeg"

import bed8 from "../images_of_male_pg/photo8.jpeg"

import bed13 from "../images_of_male_pg/photo13.jpeg"

import bed16 from "../images_of_male_pg/photo16.jpeg"

import bed20 from "../images_of_male_pg/photo20.jpeg"

import bed25 from "../images_of_male_pg/photo25.jpeg"

import gbed19 from "../images_of_female_pg/photo19.jpeg"
import gbed2 from "../images_of_female_pg/photo2.jpeg"
import gbed27 from "../images_of_female_pg/photo27.jpeg"

const Services = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // global animation duration
            once: false, // whether animation should happen only once - default true
        });
        AOS.refresh(); // refresh AOS when component mounts or updates
    }, []);
    return (
        <>

             <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#407105] mb-4">Services & Facilities</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
            Smartly designed accommodations with all-inclusive comfort — everything you need, at one price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side: Carousel & Info */}
          <div>
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
              {/* Swiper Carousel */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 1000 }}
                  loop={true}
                  slidesPerView={1}
                >
                  {[bed3, bed5, bed8, gbed19,bed13 , bed16, bed20 , bed25 , gbed2 , gbed27 ].map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={src}
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
            </div>
          </div>

          {/* Right Side: Accommodation Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Private Room",
                subtitle: "Privacy & Personal Space",
                price: "₹8,500 - ₹28,000/month",
              },
              {
                title: "Double Sharing",
                subtitle: "Friendship & Connections",
                price: "₹6,500 - ₹14,000/month",
              },
              {
                title: "Triple Sharing",
                subtitle: "Vibrant Community Atmosphere",
                price: "₹6,500 - ₹12,000/month",
              },
              {
                title: "Quad Sharing",
                subtitle: "Vibrant Community Atmosphere",
                price: "₹8,000 - ₹10,000/month",
              },
            ].map((room, index) => (
              <div
                key={index}
                className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border flex flex-col justify-between"
              >
                <div className="p-6 text-center price-card  text-white">
                  <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                  <p className="text-sm">{room.subtitle}</p>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-center items-center">
                  <ul className="space-y-3 text-gray-700 text-sm text-center">
                    <li><i className="fas fa-check text-green-500 mr-2"></i>AC/Non-AC rooms</li>
                    <li><i className="fas fa-check text-green-500 mr-2"></i>{room.price}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid bg-white rounded-xl p-2 md:grid-cols-2 gap-12 items-center">
                        <div className='  flex flex-col justify-center items-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Services Included</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-wifi text-green-600"></i>
                                    </div>
                                    <span className="text-gray-700">High-Speed WiFi</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-broom text-blue-600"></i>
                                    </div>
                                    <span className="text-gray-700">Housekeeping</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-tools text-purple-600"></i>
                                    </div>
                                    <span className="text-gray-700">Maintenance</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-fire text-orange-600"></i>
                                    </div>
                                    <span className="text-gray-700">Cooking Gas</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-center p-5'>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-start">Premium Amenities</h3>
                            <div className="space-y-4 capitalize">
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Fully Furnished Rooms</p>
                                        <p className="text-gray-600  text-sm">Full-size bed, quality mattress, wardrobe, bedside table</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Modern Kitchen</p>
                                        <p className="text-gray-600 text-sm">Gas stove, microwave, toaster, mixer grinder,
                                            water purifier</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Laundry & Utilities</p>
                                        <p className="text-gray-600 text-sm">Fully automatic washing machine, geyser,
                                            refrigerator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <section id="services" className=" bg-gray-50 pt-5 ">
                    <div className="max-w-[1220px] bg-white rounded-xl py-5 mx-auto">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-[#407105]">Additional Information</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 items-center">
                            <div className='flex flex-col justify-center items-center'>
                                <h3 className="text-2xl font-semibold text-gray-900 ">Monthly Expenses</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <i class="fa-solid fa-indian-rupee-sign text-xl text-green-500"></i>                                    </div>
                                        <span className="text-gray-700">Rent + Electricity Bill (Your responsibility)</span>
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col justify-center items-center p-5'>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-start">Security Deposit</h3>
                                <div className="space-y-4 capitalize">
                                    <div className="flex items-start space-x-3">
                                        <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                        <div>
                                            <p className="text-gray-600  text-sm">1-2 months rent (varies by property)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                        <div>
                                            <p className="text-gray-600 text-sm">Fully refundable with 1 month notice</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                        <div>
                                            <p className="text-gray-600 text-sm">Documentation charges : ₹500 (one-time)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </section>







        </>
    )
}

export default Services