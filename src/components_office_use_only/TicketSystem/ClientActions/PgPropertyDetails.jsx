
import React, { useState, useEffect, useMemo } from 'react';
import { usePropertyData, usePropertySheetData } from './services';
import CryptoJS from 'crypto-js';
import { format, subMonths } from "date-fns"; // date-fns is handy
import { SECRET_KEY } from '../../../Config';

const OverView = () => {

    const [activeTab, setActiveTab] = useState('overview');
    const [createTicket, setCreateTicket] = useState(false)
    const [decryptedUser, setDecryptedUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [uploadedDocs, setUploadedDocs] = useState({
        kyc: true,
        agreement: true,
        checkIn: false
    });


    const { data: propertyDataFromApi } = usePropertyData();

    // Use useMemo to prevent unnecessary recalculations
    const filteredPropertySheetData = useMemo(() => {
        return propertyDataFromApi?.data?.filter(
            (ele) => ele["Property Code"] === decryptedUser?.propertyCode
        );
    }, [propertyDataFromApi, decryptedUser?.propertyCode]);



    const mainSheetId = useMemo(() => {
        if (!filteredPropertySheetData || filteredPropertySheetData.length === 0) return [];

        const sheetBaseId = filteredPropertySheetData[0]["PG Main  Sheet ID"];
        const bedCount = filteredPropertySheetData[0]["Bed Count"];

        // Get last 6 months from current date (including current)
        const sheetIds = [];
        for (let i = 0; i < 2; i++) {
            const date = subMonths(new Date(), i); // i months ago
            const sheetName = format(date, "MMMyyyy"); // Format like "Sep2025"
            sheetIds.push(`${sheetBaseId},${sheetName},${bedCount}`);
        }

        return sheetIds;
    }, [filteredPropertySheetData]);


    const { data: pgMainSheetData } = usePropertySheetData(mainSheetId);

    const mainSheetDataForNameWise = useMemo(() => {
        return pgMainSheetData?.data?.length > 0
            ? pgMainSheetData?.data?.filter((ele) => ele.FullName.trim() === decryptedUser.name.trim()) : []
    }, [pgMainSheetData])
       
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

    const [propertyData, setPropertyData] = useState(null);
    useEffect(() => {
        if (filteredPropertySheetData) {
            setPropertyData(filteredPropertySheetData);
        }
    }, [filteredPropertySheetData]);






    return (
        <div className="max-w-full mx-auto  py-6  lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white border border-orange-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex bg-white px-10 py-1 w-fit rounded-lg items-center">
                            <i className="fas fa-home mr-2 text-orange-500 bg-white"></i>
                            PG Accommodation Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-3 p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">Property Address</p>
                                <p className="font-medium text-gray-900">
                                    {propertyData ? propertyData[0]?.["Property Address"] : "loading..."}
                                </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">Property Code</p>
                                <p className="font-medium text-gray-900">{propertyData ? propertyData[0]?.["Property Code"] : "loading..."} </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">WiFi Name</p>
                                <p className="font-medium text-gray-900">{propertyData ? propertyData[0]?.["WiFi Name"] : "loading..."}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">WiFi Password</p>
                                <p className="font-medium text-gray-900">{propertyData ? propertyData[0]?.["WiFi Pwd"] : "loading..."}</p>

                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg  font-bold">Date Of Joining</p>
                                <p className="font-medium text-gray-900">{decryptedUser?.doj}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg  font-bold">Security Deposit</p>
                                <p className="font-medium text-gray-900">{mainSheetDataForNameWise.length > 0 ? mainSheetDataForNameWise[0]?.DA : "loading..."}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">Monthly Rent</p>
                                <p className="font-medium text-gray-900">{mainSheetDataForNameWise.length > 0 ? mainSheetDataForNameWise[0]?.MFR : "loading..."}</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">Check in Date</p>
                                <p className="font-medium text-gray-900">{decryptedUser?.actualDoj}</p>
                            </div>
                            <div className="p-3 md:col-span-2 bg-white rounded-lg border border-orange-300">
                                <p className="text-lg font-bold">Electricity Bill Details</p>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                                    <div className="p-2 bg-gray-50 rounded border border-orange-300">
                                        <p className="text-lg  font-bold">Consumer No</p>
                                        <p className="font-medium text-gray-900">{propertyData ? propertyData[0]?.EBConsumerNo : "loading..."}</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded border border-orange-300">
                                        <p className="text-lg font-bold">Billing Unit</p>
                                        <p className="font-medium text-gray-900">{propertyData ? propertyData[0]?.EBBillingUnit : "loading..."}</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 rounded border border-orange-300">
                                        <p className="text-lg  font-bold">Power Company Web Link</p>
                                        {propertyData && propertyData[0]?.EBPCWebLink ? (
                                            <a
                                                href={propertyData[0].EBPCWebLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:underline break-all"
                                            >
                                                {propertyData[0].EBPCWebLink}
                                            </a>
                                        ) : (
                                            <p className="font-medium text-gray-900">loading...</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-6 pt-4 border-t">
                                        <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                                            <i className="fas fa-user-tie mr-2 text-orange-500"></i>
                                            PG Manager
                                        </h3>
                                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                                            <div className="bg-orange-100 rounded-full p-2 mr-3">
                                                <i className="fas fa-user-tie text-orange-600"></i>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{pgClientData.pgDetails.managerName}</p>
                                                <p className="text-sm text-orange-700">{pgClientData.pgDetails.managerContact}</p>
                                            </div>
                                        </div>
                                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView