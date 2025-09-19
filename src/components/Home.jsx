import { ReactTyped } from 'react-typed'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import video1 from "../videos/PV1NL21-privateRoom.mp4"

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // global animation duration
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
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8">
    
    {/* Left side: content */}
    <div className="flex-1 text-start  fade-in">
      <h1 className="text-[20px] font-bold text-[#407105] md:text-3xl mb-5 leading-snug">
        Our goal is to make you feel at home <br /> 
        in our paying guest facilities with all <br /> 
        the quality services
      </h1>
      {/* <h1 className="text-2xl font-normal text-[#3730a3] md:text-3xl mb-5 leading-snug">
        Our goal is to make you feel at home <br /> 
        in our paying guest facilities with all <br /> 
        the quality services
      </h1> */}

            <p className="text-xl md:text-2xl mb-6 opacity-90">
              <ReactTyped
                strings={[
                  "Enjoy Luxurious Stay at Best Price",
                ]}
                typeSpeed={20}
                backSpeed={20}
                loop
              />
            </p>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-start">
              <button className="bg-white text-[#3730a3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center">
                <h1 className='text-xl'>10+</h1>
                <p>Years Experience</p>
              </button>
              <button className="bg-white text-[#3730a3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center">
                <h1 className='text-xl'>4k+</h1>
                <p>Customers</p>
              </button>
              <button className="bg-white text-[#3730a3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center">
                <h1 className='text-xl'>500+</h1>
                <p>Reviews</p>
              </button>

            </div>
          </div>

          {/* Right side: video */}
          <div data-aos="fade-left" className="flex-1   flex justify-center md:justify-end">
            <video
              className="lg:h-96 w-full object-cover rounded-lg "
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
  )
}

export default Home
