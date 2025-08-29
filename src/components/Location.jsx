import React from 'react'

const Location = () => {
  return (
<>
   <section id="locations" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Prime Locations</h2>
            <p className="text-xl text-gray-600">Strategically located PG facilities across Mumbai & Navi Mumbai</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-hover bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-map-marker-alt text-indigo-600 mr-3"></i>Navi Mumbai, Maharashtra
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Nerul</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">CBD Belapur</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Kopar Khairane</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Ghansoli</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Airoli</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Panvel</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Vashi</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <i className="fas fa-building text-indigo-600 text-2xl mb-2"></i>
                  <p className="font-medium text-gray-900">Kharghar</p>
                </div>
              </div>
            </div>

            <div className="card-hover bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-map-marker-alt text-purple-600 mr-3"></i>Mumbai, Maharashtra
              </h3>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <i className="fas fa-city text-purple-600 text-4xl mb-4"></i>
                <p className="font-medium text-gray-900 text-lg">Multiple Prime Locations</p>
                <p className="text-gray-600 mt-2">Contact us for specific locations in Mumbai</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <i className="fas fa-info-circle text-yellow-600 text-xl mt-1"></i>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
                <p className="text-yellow-700">Before you reach any given location, please inform us a minimum of 30 minutes in advance for a smooth visit experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
</>  )
}

export default Location