import React from 'react'

const Contact = () => {
  return (
    <>
      <section id="contact" className="gradient-bg {
 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-[#2c4d04]  font-bold mb-4">Connect with us</h2>
            {/* <p className="text-xl text-[#3730a3] font-bold  opacity-90">Ready to find your perfect accommodation? Contact our team today!</p> */}
          </div>

      

          <div className="mt-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#f3d955] bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center">
              {/* <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas  text-[#3730a3] fa-headset text-2xl"></i>
              </div> */}
              <h3 className="text-xl text-[#3730a3] font-bold mb-4">Sales Team</h3>
              <a href="tel:9326262292" className="text-2xl text-[#3730a3] font-bold hover:text-[#3730a10] transition duration-300 block mb-2">
                <i className="fas text-[#3730a3] fa-phone mr-2"></i>9326262292
              </a>
              {/* <p className="opacity-80 text-[#3730a3] font-bold">Primary contact for all inquiries</p> */}
            </div>



            <div className="bg-[#f3d955] bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center">
              {/* <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas  text-[#3730a3] fa-headset text-2xl"></i>
              </div> */}
              <h3 className="text-xl text-[#3730a3] font-bold mb-4">Sales Team</h3>
              <a href="tel:7021368623" className="text-2xl text-[#3730a3] font-bold hover:text-[#3730a10] transition duration-300 block mb-2">
                <i className="fas text-[#3730a3] fa-phone mr-2"></i>7021368623
              </a>
              {/* <p className="opacity-80 text-[#3730a3] font-bold">Primary contact for all inquiries</p> */}
            </div>




            <div className="bg-[#f3d955] bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center">
              {/* <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas  text-[#3730a3] fa-headset text-2xl"></i>
              </div> */}
              <h3 className="text-xl text-[#3730a3] font-bold mb-4">Customer Care</h3>
              <a href="tel:8928191814" className="text-2xl text-[#3730a3] font-bold hover:text-[#3730a10] transition duration-300 block mb-2">
                <i className="fas text-[#3730a3] fa-phone mr-2"></i>8928191814
              </a>
              {/* <p className="opacity-80 text-[#3730a3] font-bold">Primary contact for customer support</p> */}
            </div>


          </div>
            <h3 className="text-2xl  text-[#3730a3] font-bold mt-5 text-center">Business Proprietor</h3>
            <div className="text-center mt-5">
              {/* <p className="mb-4 opacity-90 text-[#3730a3] font-bold">In case the above contact numbers are not responding, please let the business proprietor know ASAP:</p> */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:9819636341" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                  <i className="fas fa-phone mr-2"></i>9819636341
                </a>

              </div>
            </div>
          </div>

          {/* <div className="mt-12 text-center">
            <p className="text-lg opacity-90 max-w-3xl text-[#3730a3] font-bold mx-auto">Our goal is to make you feel at home in our paying guest facilities with all the quality services. We maintain separate facilities for males and females, ensuring comfort, safety, and peace of mind for all our residents.</p>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Contact