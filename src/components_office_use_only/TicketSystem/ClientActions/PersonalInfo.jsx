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
        <div className="max-w-full mx-auto md:px-4 py-6 sm:px-6">
    <div className="bg-white border border-orange-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center bg-white px-2 py-1 w-fit rounded-lg">
            <i className="fas fa-user-circle mr-2 text-orange-500"></i>
            Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Helper component pattern would be ideal, but keeping it simple here */}

            {[
                { label: "Full Name", value: decryptedUser?.name },
                { label: "Calling No", value: decryptedUser?.calling },
                { label: "WhatsApp No", value: decryptedUser?.whatsAppNo },
                { label: "Email Id", value: decryptedUser?.loginId },
                { label: "Date Of Birth", value: decryptedUser?.dob },
                { label: "Blood Group", value: decryptedUser?.bloodGroup },
                { label: "Occupation", value: decryptedUser?.occupation },
                { label: "Organisation", value: decryptedUser?.organisation },
                { label: "Emergency Cont1 Name", value: decryptedUser?.emgyCont1FullName },
                { label: "Emergency Cont1 No", value: decryptedUser?.emgyCont1No },
                { label: "Emergency Cont2 Name", value: decryptedUser?.emgyCont2FullName },
                { label: "Emergency Cont2 No", value: decryptedUser?.emgyCont2No },
            ].map((item, index) => (
                <div
                    key={index}
                    className="p-3 bg-white rounded-lg border border-orange-300"
                >
                    <p className="text-lg font-bold">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value || "N/A"}</p>
                </div>
            ))}

            {/* Permanent Address - spans 3 columns on md+ screens */}
            <div className="p-3 bg-white rounded-lg border border-orange-300 md:col-span-3">
                <p className="text-lg font-bold">Permanent Address</p>
                <p className="font-medium text-gray-900">
                    {decryptedUser?.permanentAddress || "N/A"}
                </p>
            </div>
        </div>
    </div>
</div>

    )
}

export default PersonalInfo