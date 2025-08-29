
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
            <section id="about" className="py-10 bg-white">
                <div data-aos="fade-right" data-aos-duration="2000" data-aos-offset="200" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
                        <p className="text-xl text-gray-600">A Decade of Excellence in Professional & Student Accommodation</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="relative">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-80 w-full rounded-xl"></div>
                                <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-6 rounded-xl shadow-lg">
                                    <p className="text-3xl font-bold text-indigo-900">10+</p>
                                    <p className="text-indigo-800 font-semibold">Years Experience</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">We Serve Beyond Business</h3>
                            <p className="text-gray-600 mb-6">
                               
                                We are very particular about cleanliness and maintenance, ensuring your living space is always pristine and well-cared for.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-users-cog text-green-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">In-House Professional Teams</h4>
                                        <p className="text-gray-600">We have dedicated in-house teams for every service need, ensuring super fast response times and professional solutions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-sitemap text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Departmental Specialization</h4>
                                        <p className="text-gray-600">We have qualified professionals to manage each department separately, creating a properly structured professional environment.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                                        <i className="fas fa-award text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Decade of Experience</h4>
                                        <p className="text-gray-600">With over 10 years in this business, we've perfected our processes to deliver the best possible experience for our residents.</p>
                                    </div>
                                </div>
                            </div>

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