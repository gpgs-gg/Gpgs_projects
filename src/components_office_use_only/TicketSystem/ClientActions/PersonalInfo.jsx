import React, { useEffect, useState } from 'react'
import { SECRET_KEY } from '../../../Config';
import CryptoJS from 'crypto-js';


const PersonalInfo = () => {
        const [decryptedUser, setDecryptedUser] = useState(null);
    
       useEffect(() => {
            const encrypted = localStorage.getItem('user');
            if (encrypted) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
                    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    setDecryptedUser(JSON.parse(decrypted));
                } catch (error) {
                    console.error('Failed to decrypt user:', error);
                }
            }
            // const timer = setInterval(() => {
            //     setCurrentTime(new Date());
            // }, 1000);
    
            // return () => clearInterval(timer);
        }, []);

       console.log("decryptedUser", decryptedUser)
  return (
         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                <i className="fas fa-user-circle mr-2 text-orange-500"></i>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Name
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.name}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Phone
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Email Id
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.loginId}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Id Proof
                                    </p>
                                    <p className="font-medium text-gray-900">Aadhaar Card - {decryptedUser?.aadharNo}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Date Of Birth
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.dob}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Blood Group
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.bloodGroup}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Occupation
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.occupation}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Organisation
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.organisation}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Emergancy Cantact Name 1
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Emergancy Cantact No.1
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Emergancy Cantact Name 2
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Emergancy Cantact No.2
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Permanent Address
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Temparary Address
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default PersonalInfo