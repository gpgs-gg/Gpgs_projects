// import { ReactTyped } from 'react-typed'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // global animation duration
            once: false, // whether animation should happen only once - default true
        });
        AOS.refresh(); // refresh AOS when component mounts or updates
    }, []);
    return (
        <>
            <section id="home" className="gradient-bg text-white py-10 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center fade-in">
                        {/* Typing animation on heading */}
                        <h1 className="text-2xl font-bold mt-[-30px] text-[#3730a3] md:text-3xl mb-5">
                              Our goal is to make you feel at home in our paying guest <br/> facilities with all the quality services
                            {/* <ReactTyped
                                strings={[
                                    //   "We Serve Beyond Business",
                                    //   "Enjoy Luxury Living",
                                    //   "Comfort & Community Await You",
                                    "Welcome to Gopal's Paying Guest Services ",
                                    "We Serve Beyond Business",
                                    "Enjoy Luxury Living",
                                    "Comfort & Community Await You",
                                ]}
                                typeSpeed={60}
                                backSpeed={40}
                                loop
                            /> */}
                        </h1>

                        {/* Subheading */}
                        <p  className="text-xl md:text-2xl mb-8 opacity-90">
                            Enjoy Luxury at the Best Price
                        </p>

                        {/* Description */}
                        <p className="text-lg mb-10 max-w-3xl mx-auto opacity-80">
                            Premium paying guest accommodations for professionals and students
                            in Mumbai & Navi Mumbai. Experience comfort, convenience, and
                            community in our thoughtfully designed spaces.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                                <i className="fas fa-phone mr-2"></i>Call Now: 9326262292
                            </button>
                            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                               <i className="fas fa-map-marker-alt mr-2"></i>Office Location
                            </button>
                            {/* <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
                                <i className="fas fa-map-marker-alt mr-2"></i>Office Locations
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
