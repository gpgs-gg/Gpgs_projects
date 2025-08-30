import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

            <section id="services" className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div  className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">Choose from our wide range of accommodation options designed for your comfort and convenience</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card-hover bg-white rounded-xl shadow-lg p-8 border">
                            <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <i className="fas fa-bed text-white text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Single Sharing</h3>
                            <p className="text-gray-600 mb-6 text-center">Private rooms with all amenities for those who value privacy and personal space.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li><i className="fas fa-check text-green-500 mr-2"></i>Private AC/Non-AC rooms</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>Full-size bed & wardrobe</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>₹8,500 - ₹28,000/month</li>
                            </ul>
                        </div>

                        <div className="card-hover bg-white rounded-xl shadow-lg p-8 border">
                            <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <i className="fas fa-user-friends text-white text-2xl"></i>

                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Double Sharing</h3>
                            <p className="text-gray-600 mb-6 text-center">Comfortable shared accommodation perfect for building friendships and connections.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li><i className="fas fa-check text-green-500 mr-2"></i>AC/Non-AC options</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>Quality furnishing</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>₹6,500 - ₹14,000/month</li>
                            </ul>
                        </div>

                        <div className="card-hover bg-white rounded-xl shadow-lg p-8 border">
                            <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <i className="fas fa-users text-white text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Triple Sharing</h3>
                            <p className="text-gray-600 mb-6 text-center">Budget-friendly option with all essential amenities and a vibrant community atmosphere.</p>
                            <ul className="space-y-2 text-gray-600">
                                <li><i className="fas fa-check text-green-500 mr-2"></i>AC/Non-AC rooms</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>All amenities included</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>₹6,500 - ₹11,000/month</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Facilities</h2>
                        <p className="text-xl text-gray-600">Everything you need for a comfortable stay, included in your rent</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Free Services Included</h3>
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

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Premium Amenities</h3>
                            <div className="space-y-4 capitalize">
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Fully Furnished Rooms</p>
                                        <p className="text-gray-600  text-sm">Full-size bed, quality mattress, wardrobe, and shoe box</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Modern Kitchen</p>
                                        <p className="text-gray-600 text-sm">Gas stove, microwave, toaster, mixer grinder, water purifier</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Laundry & Utilities</p>
                                        <p className="text-gray-600 text-sm">Fully automatic washing machine, geyser, refrigerator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Services