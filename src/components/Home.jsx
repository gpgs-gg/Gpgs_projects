import { ReactTyped } from 'react-typed'
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

    const handleMap = () => {
        window.open(
            "https://www.google.com/maps/place/Gopal's+Paying+Guest+Services/@19.0346655,73.0214381,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c30f479c2543:0x2955da06c91d2d7f!8m2!3d19.0346655!4d73.024013!16s%2Fg%2F11rc28lypw?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
            "_blank"
        );
    };




    return (
        <>
            <section id="home" className="gradient-bg text-black py-[50px] pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center fade-in">
                        {/* Typing animation on heading */}
                        <h1 className="text-2xl font-bold  text-[#3730a3] md:text-3xl mb-5">
                            Our goal is to make you feel at home in our paying guest <br /> facilities with all the quality services

                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl mb-4 opacity-90">
                            <ReactTyped
                                strings={[
                                    //   "We Serve Beyond Business",
                                    //   "Enjoy Luxury Living",
                                    //   "Comfort & Community Await You",
                                    "Enjoy Luxury at the Best Price",
                                ]}
                                typeSpeed={20}
                                backSpeed={20}
                                loop
                            />
                        </p>

                        {/* Description */}
                        {/* <p className="text-xl mb-4 max-w-xl mx-auto opacity-80">
                            At Gopal’s Paying Guest Services, We provide fully furnished, secure and
                            comfortable PG accommodations for men and women separately in Navi
                            Mumbai. Designed for your convenience, with a decade of curated
                            experience in professional and student accommodation.
                        </p> */}


                        <h1 className='text-xl font-bold mb-5 text-[#3730a3]'>
                            Book Your Stay With Us Today
                        </h1>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                                <i className="fas fa-phone mr-2"></i> 9326262292
                            </button>
                            <button onClick={handleMap} className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
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
