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

    return (
        <div className="max-w-full  mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white border border-orange-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex bg-white px-10 py-1 w-fit rounded-lg items-center">
                            <i className="fas fa-user-circle mr-2 text-orange-500 bg-white"></i>
                           Personal Information
                        </h2>
                <div className="grid grid-cols-1 md:grid-cols-4  gap-6">
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Name
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.name}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Phone
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Email Id
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.loginId}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Id Proof
                        </p>
                        <p className="font-medium text-gray-900">Aadhaar Card - {decryptedUser?.aadharNo}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Date Of Birth
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.dob}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Blood Group
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.bloodGroup}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Occupation
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.occupation}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Organisation
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.organisation}</p>
                    </div>
                    <div className="p-3 bg-white  rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Emergency Contact1 Full Name
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.emgyCont1FullName}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Emergency Contact1 No
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.emgyCont1No}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Emergency Contact2 Full Name
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.emgyCont2FullName}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Emergency Contact2 No
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.emgyCont2No}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-orange-300">
                        <p className="text-lg  font-bold">
                            Permanent Address
                        </p>
                        <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                    </div>
                    {/* <div className="p-3 bg-white rounded-lg">
                                    <p className="text-sm text-orange-700 font-medium">
                                        Temparary Address
                                    </p>
                                    <p className="font-medium text-gray-900">{decryptedUser?.calling}</p>
                                </div> */}
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo