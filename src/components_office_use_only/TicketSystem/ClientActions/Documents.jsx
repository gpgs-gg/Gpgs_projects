import React, { useState, useRef } from 'react';

const Documents = () => {
    const [uploadedDocs, setUploadedDocs] = useState({
        kyc: [],
        agreement: null,
        checkIn: null,
    });

    const [savedDocs, setSavedDocs] = useState({
        kyc: false,
        agreement: false,
        checkIn: false,
    });

    const fileInputRefs = {
        kyc: useRef(),
        agreement: useRef(),
        checkIn: useRef(),
    };

    const handleFileChange = (type, event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadedDocs((prev) => {
            if (type === 'kyc') {
                return {
                    ...prev,
                    kyc: [...prev.kyc, file],
                };
            } else {
                return {
                    ...prev,
                    [type]: file,
                };
            }
        });
    };

    const handleUploadClick = (type) => {
        if (!savedDocs[type]) {
            fileInputRefs[type].current.click();
        }
    };

    const handleSave = (type) => {
        if (type === 'kyc' && uploadedDocs.kyc.length === 0) return;
        if (type !== 'kyc' && !uploadedDocs[type]) return;

        setSavedDocs((prev) => ({
            ...prev,
            [type]: true,
        }));
    };

    const handleRemoveKycFile = (index) => {
        setUploadedDocs((prev) => ({
            ...prev,
            kyc: prev.kyc.filter((_, i) => i !== index),
        }));
    };

    const getFileLabel = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('aadhaar')) return 'Aadhaar';
        if (lower.includes('pan')) return 'PAN Card';
        if (lower.includes('photo') || lower.includes('img')) return 'Photograph';
        return 'Document';
    };

    const documentsList = [
        {
            type: 'kyc',
            label: 'KYC Documents',
            desc: 'Upload Aadhaar, PAN, Photo (multiple allowed one by one)',
            icon: 'fa-id-card',
        },
        {
            type: 'agreement',
            label: 'Rental Agreement',
            desc: 'Digitally signed document',
            icon: 'fa-file-signature',
        },
        {
            type: 'checkIn',
            label: 'Check-in Form',
            desc: 'Move-in details',
            icon: 'fa-sign-in-alt',
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-white border border-orange-300 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <i className="fas fa-folder-open mr-2 text-orange-500"></i>
                    Document Upload & Preview
                </h2>

                <div className="space-y-6">
                    {documentsList.map((doc) => {
                        const uploaded = uploadedDocs[doc.type];
                        const isSaved = savedDocs[doc.type];
                        const hasUploaded =
                            doc.type === 'kyc' ? uploaded.length > 0 : uploaded !== null;

                        return (
                            <div
                                key={doc.type}
                                className={`border-2 rounded-lg p-4 transition-shadow ${isSaved ? 'border-green-300 bg-green-50' : 'border-orange-200 '
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <i
                                            className={`fas text-2xl mr-3 ${isSaved
                                                ? 'fa-check-circle text-green-600'
                                                : `${doc.icon} text-orange-500`
                                                }`}
                                        ></i>
                                        <div>
                                            <h3 className="font-semibold text-lg">{doc.label}</h3>
                                            <p className="text-sm text-gray-500">{doc.desc}</p>
                                        </div>
                                    </div>

                                    {!isSaved && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleUploadClick(doc.type)}
                                                className="bg-orange-600 text-white px-3 py-1.5 text-sm rounded hover:bg-orange-700"
                                            >
                                                <i className="fas fa-upload mr-1"></i> Upload
                                            </button>

                                            <button
                                                onClick={() => handleSave(doc.type)}
                                                className={`${hasUploaded ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                                                    } text-white px-3 py-1.5 text-sm rounded`}
                                                disabled={!hasUploaded}
                                            >
                                                <i className="fas fa-save mr-1"></i> Save
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* File preview */}
                                <div className="space-y-2 flex gap-6 flex-wrap">
                                    {hasUploaded ? (
                                        doc.type === 'kyc' ? (
                                            uploaded.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white w-fit border border-green-200 rounded px-3 py-2 flex flex-col items-center space-y-2 relative"
                                                >
                                                    <a
                                                        href={URL.createObjectURL(file)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline text-sm flex items-center"
                                                    >
                                                        {file.type.startsWith('image/') ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Preview ${index}`}
                                                                className="w-40 h-40 object-cover rounded"
                                                            />
                                                        ) : (
                                                            <i className="fas fa-file-alt text-gray-500 text-2xl"></i>
                                                        )}
                                                    </a>
                                                    {!isSaved && (
                                                        <button
                                                            onClick={() => handleRemoveKycFile(index)}
                                                            className="text-xs text-red-500 hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            uploaded && (
                                                <div className="bg-white border border-green-200 rounded px-3 py-2 flex items-center space-x-4">
                                                    <a
                                                        href={URL.createObjectURL(uploaded)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline text-sm flex items-center"
                                                    >
                                                        {uploaded.type.startsWith('image/') ? (
                                                            <img
                                                                src={URL.createObjectURL(uploaded)}
                                                                alt="Preview"
                                                                className="w-40 h-40 object-cover rounded"
                                                            />
                                                        ) : (
                                                            <i className="fas fa-file-alt text-gray-500 text-2xl"></i>
                                                        )}
                                                    </a>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">
                                            No document uploaded yet.
                                        </p>
                                    )}
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="hidden"
                                    ref={fileInputRefs[doc.type]}
                                    onChange={(e) => handleFileChange(doc.type, e)}
                                    multiple={false}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Documents;
