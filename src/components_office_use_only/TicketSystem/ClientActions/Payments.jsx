import React, { useState, useEffect, useMemo } from 'react';
import CryptoJS from 'crypto-js';
import { format, subMonths } from "date-fns"; // date-fns is handy
import { usePropertyData, usePropertySheetData } from './services';
import { SECRET_KEY } from '../../../Config';

const pgClientData = {
    personalInfo: {
        name: "Rahul Sharma",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        phone: "+91 98765 43210",
        email: "rahul.sharma@example.com",
        emergencyContact: "+91 98765 43211 (Parent)",
        idProof: "Aadhar Card - XXXX XXXX 5678",
        dob: "15 March 1998",
        bloodGroup: "B+",
        occupation: "Software Engineer",
        company: "Tech Solutions Pvt. Ltd."
    },
    pgDetails: {
        pgName: "Elite PG for Gents",
        roomNo: "A-204",
        sharingType: "2 Sharing",
        checkInDate: "15 June 2023",
        duration: "6 Months",
        rent: "₹12,000/month",
        deposit: "₹15,000",
        address: "H-12, Sector 63, Noida, Uttar Pradesh - 201301",
        managerName: "Vikram Singh",
        managerContact: "+91 98765 12345"
    },
    paymentInfo: {
        currentDue: "₹12,000",
        dueDate: "5 October 2023",
        previousDue: "₹0",
        paymentHistory: [
            { month: "September 2023", amount: "₹12,000", status: "Paid", date: "2 Sep 2023" },
            { month: "August 2023", amount: "₹12,000", status: "Paid", date: "1 Aug 2023" },
            { month: "July 2023", amount: "₹12,000", status: "Paid", date: "3 Jul 2023" }
        ]
    },
    complaints: [
        { id: "CMP001", date: "20 Sep 2023", category: "Housekeeping", status: "Resolved", description: "Room not cleaned properly" },
        { id: "CMP002", date: "15 Sep 2023", category: "Maintenance", status: "In Progress", description: "AC not working" },
        { id: "CMP003", date: "5 Sep 2023", category: "WiFi", status: "Resolved", description: "Internet connectivity issue" }
    ]
};

const Payments = () => {

    const [activeTab, setActiveTab] = useState('overview');
    const [createTicket, setCreateTicket] = useState(false)
    const [decryptedUser, setDecryptedUser] = useState(null);

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
            ? pgMainSheetData?.data?.filter((ele) => ele.FullName === decryptedUser.name) : []
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


    return (
//         <div className="max-w-full">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//                 <div className="lg:col-span-1">
//                     <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
//                         <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                             <i className="fas fa-credit-card mr-2 text-orange-500"></i>
//                             Payment Summary
//                         </h2>
//                         <div className="space-y-4">
//                             <div className="flex justify-between p-3 bg-red-50 rounded-lg">
//                                 <p className="text-red-700 font-medium">Current Due</p>
//                                 <p className="font-semibold text-red-600">{mainSheetDataForNameWise.length > 0 ? mainSheetDataForNameWise[0]?.CurDueAmt : "loading..."}</p>
//                             </div>
//                             <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
//                                 <p className="text-orange-700 font-medium">Due Date</p>
// <p className=" text-gray-900">{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`}</p>
//                             </div>
//                             <div className="flex justify-between p-3 bg-green-50 rounded-lg">
//                                 <p className="text-green-700 font-medium">Previous Due</p>
//                                 <p className="font-semibold text-green-600">{mainSheetDataForNameWise.length > 0 ? mainSheetDataForNameWise[0]?.PreDueAmt : "loading..."}</p>
//                             </div>
//                             <div className="pt-4 border-t">
//                                 <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200 flex items-center justify-center">
//                                     <i className="fas fa-wallet mr-2"></i>
//                                     Pay Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="lg:col-span-4">
//                     <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
//                         <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                             <i className="fas fa-history mr-2 text-orange-500"></i>
//                             Payment History
//                         </h2>
//                         <div className="overflow-x-auto">


//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Month</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Rent</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Deposit</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Processing Fees</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Electricity Bill</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Adjusted Electricity Bill</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Adjusted Amount</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Total Receivable Amount</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Total Received Amount</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Current Due</th>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Previous Due</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {mainSheetDataForNameWise &&
//                                         mainSheetDataForNameWise
//                                             .filter((ele) => [
//                                                 "__month",
//                                                 "RentAmt",
//                                                 "DA",
//                                                 "ProFees",
//                                                 "EBAmt",
//                                                 "AdjEB",
//                                                 "AdjAmt",
//                                                 "ToRcableAmt",
//                                                 "ToRcvedAmt",
//                                                 "CurDueAmt",
//                                                 "PreDueAmt"
//                                             ]
//                                                 .every((key) => ele.hasOwnProperty(key)))
//                                             .map((payment, index) => (
//                                                 <tr key={index} className="hover:bg-orange-50">
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{payment.__month}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.RentAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.DA}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ProFees}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.EBAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.AdjEB}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.AdjAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ToRcableAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ToRcvedAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.CurDueAmt}</td>
//                                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.PreDueAmt}</td>
//                                                 </tr>
//                                             ))}
//                                 </tbody>
//                             </table>


//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
          <div className="max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                <div className="bg-white flex flex-col rounded-lg shadow-sm p-1 hover:shadow-md transition-shadow border lg:col-span-6">
                    <h2 className="text-lg font-semibold text-gray-900 p-6  flex items-center">
                        <i className="fas fa-credit-card mr-2 text-orange-500"></i>
                        Payment Summary
                    </h2>

                    <div className="flex justify-evenly mb-6">
                        <div className="flex  justify-between p-3 bg-white border border-orange-300 rounded-lg w-80">
                            <p className="text-gray-700 font-bold">Current Due</p>
                            <p className="font-semibold text-gray-700">
                                {mainSheetDataForNameWise.length > 0
                                    ? mainSheetDataForNameWise[0]?.CurDueAmt
                                    : "loading..."}
                            </p>
                        </div>

                        <div className="flex  justify-between p-3 bg-white border border-orange-300 rounded-lg w-80">
                            <p className="text-gray-700 font-bold">Due Date</p>
                            <p className="font-semibold text-gray-700">{`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}</p>
                        </div>

                        <div className="flex  justify-between p-3 bg-white border border-orange-300 rounded-lg w-80">
                            <p className="text-gray-700 font-bold">Previous Due</p>
                            <p className="font-semibold text-gray-700">
                                {mainSheetDataForNameWise.length > 0
                                    ? mainSheetDataForNameWise[0]?.PreDueAmt
                                    : "loading..."}
                            </p>
                        </div>
                         <div className=" flex justify-center items-center">
                        <button className="w-fit bg-orange-300 text-black font-bold py-3 px-5 rounded-md hover:bg-orange-400 transition duration-200 flex items-center justify-center">
                            <i className="fas fa-wallet mr-2"></i>
                            Pay Now
                        </button>
                    </div>
                    </div>

                   
                </div>


               <div className="lg:col-span-6">
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
      <i className="fas fa-history mr-2 text-orange-500"></i>
      Payment History
    </h2>

    <div className="overflow-x-auto">
      <table className="min-w-[1200px] divide-y divide-orange-300">
        <thead>
          <tr>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Month</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Rent</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Deposit</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Processing Fees</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Electricity Bill</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Adjusted Electricity Bill</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Adjusted Amount</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Total Receivable Amount</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Total Received Amount</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Current Due</th>
            <th className="text-left text-lg font-bold bg-orange-300 text-black tracking-wider whitespace-nowrap px-4 py-2">Previous Due</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mainSheetDataForNameWise &&
            mainSheetDataForNameWise
              .filter((ele) =>
                [
                  "__month",
                  "RentAmt",
                  "DA",
                  "ProFees",
                  "EBAmt",
                  "AdjEB",
                  "AdjAmt",
                  "ToRcableAmt",
                  "ToRcvedAmt",
                  "CurDueAmt",
                  "PreDueAmt",
                ].every((key) => ele.hasOwnProperty(key))
              )
              .map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{payment.__month}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.RentAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.DA}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ProFees}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.EBAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.AdjEB}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.AdjAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ToRcableAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.ToRcvedAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.CurDueAmt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹. {payment.PreDueAmt}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

            </div>
        </div>
    )
}

export default Payments