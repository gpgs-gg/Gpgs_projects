import React, { useState, useRef } from 'react';

const Documents = () => {
  const [uploadedDocs, setUploadedDocs] = useState({
    kyc: null,
    agreement: null,
    checkIn: null,
  });

  const fileInputRefs = {
    kyc: useRef(),
    agreement: useRef(),
    checkIn: useRef(),
  };

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocs((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleUploadClick = (type) => {
    fileInputRefs[type].current.click(); // Trigger file input
  };

  const documentsList = [
    { type: 'kyc', label: 'KYC Documents', desc: 'Aadhar, PAN, Photo', icon: 'fa-id-card' },
    { type: 'agreement', label: 'Rental Agreement', desc: 'Digitally signed document', icon: 'fa-file-signature' },
    { type: 'checkIn', label: 'Check-in Form', desc: 'Move-in details', icon: 'fa-sign-in-alt' },
  ];
    console.log("documentsList", documentsList)
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <i className="fas fa-folder-open mr-2 text-orange-500"></i>
          Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documentsList.map((doc) => {
            const uploaded = uploadedDocs[doc.type];

            return (
              <div key={doc.type} className="text-center">
                <div
                  className={`border-2 rounded-lg p-6 hover:shadow-md transition-shadow ${
                    uploaded ? 'border-green-300 bg-green-50' : 'border-orange-200 bg-orange-50'
                  }`}
                >
                  <i
                    className={`fas text-3xl mb-3 ${
                      uploaded ? 'fa-check-circle text-green-600' : `${doc.icon} text-orange-500`
                    }`}
                  ></i>

                  <h3 className="font-medium text-lg text-gray-900">{doc.label}</h3>
                  <p className="text-sm text-orange-700 mt-2">{doc.desc}</p>

                  {uploaded ? (
                    <a
                      href={URL.createObjectURL(uploaded)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-green-600 text-sm font-medium flex items-center justify-center mx-auto"
                    >
                      <i className="fas fa-eye mr-1"></i> View Document
                    </a>
                  ) : (
                    <button
                      onClick={() => handleUploadClick(doc.type)}
                      className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-md text-sm hover:bg-orange-700 flex items-center justify-center mx-auto"
                    >
                      <i className="fas fa-upload mr-1"></i> Upload Now
                    </button>
                  )}

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    ref={fileInputRefs[doc.type]}
                    onChange={(e) => handleFileChange(doc.type, e)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Documents;
