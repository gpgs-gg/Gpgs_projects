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

            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">


                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services & Facilities</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">Smartly designed accommodations with all-inclusive comfort —

                            everything you need, at one price.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border">
                            <div className="price-card p-6 text-white text-center">
                                <h3 className="text-2xl font-bold mb-2">Private Room</h3>
                                <p className="opacity-90">Privacy & Personal Space</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3 flex flex-col justify-center items-center text-gray-600">
                                  <div className='flex flex-col gap-2'>
                                      <li><i className="fas fa-check text-green-500 mr-2"></i> AC/Non-AC rooms</li>
                                    <li><i className="fas fa-check text-green-500 mr-2"></i>₹8,500 - ₹28,000/month</li>
                                  </div>
                                </ul>
                            </div>
                        </div>




                        <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border">
                            <div className="price-card p-6 text-white text-center">
                                <h3 className="text-2xl font-bold mb-2">Double Sharing</h3>
                                <p className="opacity-90">  Friendship & Connections.</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3 flex flex-col justify-center items-center text-gray-600">
                                    <div className='flex flex-col gap-2'>
                                    <li><i className="fas fa-check text-green-500 mr-2"></i>AC/Non-AC options</li>
                                    {/* <li><i className="fas fa-check text-green-500 mr-2"></i>Quality furnishing</li>  */}
                                    <li><i className="fas fa-check text-green-500 mr-2"></i>₹6,500 - ₹14,000/month</li>
                                    </div>
                                </ul>
                            </div>
                        </div>


                        <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border">
                            <div className="price-card p-6 text-white text-center">
                                <h3 className="text-2xl font-bold mb-2">Triple Sharing</h3>
                                <p className="opacity-90"> Vibrant Community Atmosphere.</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3 flex flex-col justify-center items-center text-gray-600">
                                     <div className='flex flex-col gap-2'>
                                    <li><i className="fas fa-check text-green-500 mr-2"></i>AC/Non-AC rooms</li>
                                    {/* <li><i className="fas fa-check text-green-500 mr-2"></i>All amenities included</li> */}
                                    <li><i className="fas fa-check text-green-500 mr-2"></i>₹6,500 - ₹11,000/month</li>
                                    </div>
                                </ul>
                            </div>
                        </div>




                    </div>


                    {/* <div className="bg-white rounded-xl shadow-md border p-10 hover:shadow-lg transition duration-300 max-w-sm max-h-fit mx-auto">
                            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i className="fas fa-bed text-white text-xl"></i>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
                                Private Room
                            </h3>

                            <p className="text-sm text-gray-600 text-center mb-4">
                                Privacy & Personal Space
                            </p>

                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                                    <span>AC/Non-AC rooms</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                                    <span>₹8,500 - ₹28,000/month</span>
                                </li>
                            </ul>
                        </div> */}


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
                                        <p className="text-gray-600  text-sm">Full-size bed, quality mattress, wardrobe
                                            and bedside table.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Modern Kitchen</p>
                                        <p className="text-gray-600 text-sm">Gas stove, microwave, toaster, mixer grinder,
                                            water purifier.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="font-medium text-gray-900">Laundry & Utilities</p>
                                        <p className="text-gray-600 text-sm">Fully automatic washing machine, geyser,
                                            refrigerator.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            <section id="services" className=" bg-gray-50 pt-5 ">
                <div className="max-w-[1220px] bg-white rounded-xl py-5 mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-900">Additional Information</h2>
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
                                        <p className="text-gray-600  text-sm">1-2 months rent (varies by property).</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="text-gray-600 text-sm">Fully refundable with 1 month notice.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                    <div>
                                        <p className="text-gray-600 text-sm">Documentation charges : ₹500 (one-time).</p>
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