
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // global animation duration
            once: false, // whether animation should happen only once - default true
        });
        AOS.refresh(); // refresh AOS when component mounts or updates
    }, []);
    return (
        <>
            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>

                    </div>

                    <div className="grid md:grid-cols-1 gap-12 items-center">
                        <div>
                            <div className="relative">
                                <div className="bg-gradient-to-r p-24  from-indigo-500 to-purple-600 h-full w-full rounded-xl">
                                    <div className="space-y-4 mb-10">

                                        <div className="flex items-start ">
                                            <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                                                <ul className="grid grid-cols-1 gap-y-2 list-disc list-inside text-gray-700 text-sm">
                                                    {/* <div className="bg-green-100 p-2 rounded-full mr-4">
                                                        <i className="fas fa-users-cog text-green-600"></i>
                                                    </div> */}
                                                    <div>
                                                        <h4 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">Who are we?</h4>
                                                        <p className="text-black text-lg" >We are a team of dedicated and qualified professionals with
                                                            10+ years of experience in accommodation and maintenance
                                                            services with properly structured departments and
                                                            processes to deliver the best possible experience for our
                                                            residents.</p>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>


                                        <div className="flex items-start pt-5">
                                            <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                                                <ul className="grid grid-cols-1 gap-y-2 list-disc list-inside text-gray-700 text-sm">
                                                    {/* <div className="bg-blue-100 p-2 rounded-full mr-4">
                                                        <i className="fas fa-sitemap text-blue-600"></i>
                                                    </div> */}
                                                    <div>
                                                        <h4 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">Our Mission & Vision</h4>
                                                        <p className="text-black text-lg">We believe in providing comfortable homes for everyone— so we
                                                            create spaces that feel just like your own while serving beyond
                                                            business with prompt issue resolutions and professional services
                                                            for your every need.</p>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex items-start">

                                        </div>

                                        <div className="flex items-start">
                                            {/* <div className="bg-purple-100 p-2 rounded-full mr-4">
                                                <i className="fas fa-award text-purple-600"></i>
                                            </div> */}
                                            <div>
                                                <div className="bg-gray-50 rounded-xl shadow-lg p-8">
                                                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                                        <i className="fas fa-star text-yellow-500 mr-3"></i> Why Choose Us?
                                                    </h3>

                                                    <ul className="grid grid-cols-2 gap-y-2 list-disc list-inside text-gray-700 text-sm">
                                                        <li className='w-'>Non-Compromising Service Quality</li>
                                                        <li>Daily Housekeeping</li>
                                                        <li>Prime Residential Locations</li>
                                                        <li>In-house Maintenance Team</li>
                                                        <li>Safe & Secure Premises</li>
                                                        <li>In-house Customer Support Team</li>
                                                        <li>Branded Furniture & Appliances</li>
                                                        <li>Scheduled Appliances Servicing</li>
                                                        <li>Transparent Pricing</li>
                                                        <li>Quarterly Deep Cleaning & Pest Control</li>
                                                    </ul>
                                                </div>




                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="absolute -top-6 -right-6 bg-yellow-400 p-6 rounded-xl shadow-lg">
                                    <p className="text-3xl font-bold text-indigo-900">10+</p>
                                    <p className="text-indigo-800 font-semibold">Years Experience</p>
                                </div>
                            </div>
                        </div>

                        <div>

                            {/* <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-users-cog text-green-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Who are we?</h4>
                                        <p className="text-gray-600">We are a team of dedicated and qualified professionals with
                                            10+ years of experience in accommodation and maintenance
                                            services with properly structured departments and
                                            processes to deliver the best possible experience for our
                                            residents.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-sitemap text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Our Mission & Vision</h4>
                                        <p className="text-gray-600">We believe in providing comfortable homes for everyone— so we
                                            create spaces that feel just like your own while serving beyond
                                            business with prompt issue resolutions and professional services
                                            for your every need.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-award text-purple-600"></i>
                                    </div>
                                    <div>
                                        <div className="bg-white rounded-xl shadow-lg p-8">
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                                <i className="fas fa-star text-yellow-500 mr-3"></i> Why Choose Us?
                                            </h3>

                                            <ul className="grid grid-cols-1 gap-y-2 list-disc list-inside text-gray-700 text-sm">
                                                <li className='w-'>Non-Compromising Service Quality</li>
                                                <li>Daily Housekeeping</li>
                                                <li>Prime Residential Locations</li>
                                                <li>In-house Maintenance Team</li>
                                                <li>Safe & Secure Premises</li>
                                                <li>In-house Customer Support Team</li>
                                                <li>Branded Furniture & Appliances</li>
                                                <li>Scheduled Appliances Servicing</li>
                                                <li>Transparent Pricing</li>
                                                <li>Quarterly Deep Cleaning & Pest Control</li>
                                            </ul>
                                        </div>




                                    </div>
                                </div>
                            </div> */}

                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                                <p className="text-gray-700 italic">"We believe that a comfortable home environment is essential for success, whether you're a student or working professional. That's why we go beyond business to create spaces that feel like home."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About