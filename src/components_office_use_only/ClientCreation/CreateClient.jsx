import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import { useClientDetails, usePropertyData, useUpdateClientCreation } from './services';
import * as yup from "yup";
import { toast } from 'react-toastify';
import LoaderPage from '../NewBooking/LoaderPage';
import { useApp } from '../TicketSystem/AppProvider';

// ✅ Yup validation schema (example, modify based on real rules)
const schema = yup.object().shape({
    PropertyCode: yup.string().required("Property Code is required"),
    ClientID: yup.string().required("Client ID is required"),
    // TemporaryPropertyCode: yup.string().required("Temporary Property Code is required"),
    Name: yup.string().required("Full name is required"),
    RentDate: yup.string().required("Rent Date is required"),
    WhatsAppNo: yup.string().required("WhatsApp No is required"),
    CallingNo: yup.string().required("Calling No is required"),
    EmailID: yup.string().required("Email ID is required"),
    DOJ: yup.string().required("DOJ is required"),
    EmgyCont1FullName: yup.string().required("Emgy Cont1 FullName is required"),
    EmgyCont1No: yup.string().required("Emgy Cont1 No is required"),
    // Occupation: yup.string().required("Occupation is required"),
    // Organization: yup.string().required("Organization is required"),
    ParkingCharges: yup.string().required("Parking Charges is required"),
});

const CreateClient = () => {
    const { data: clientDetails } = useClientDetails();
    const { data: propertyDetails } = usePropertyData();
    const [mode, setMode] = useState("Create New Client")
    const { decryptedUser } = useApp()

    // console.log(1111111111, decryptedUser)


    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const filterClientData = clientDetails && clientDetails?.data?.find((ele) => ele.ClientID === watch("ClientID"))
    useEffect(() => {

        if (mode !== "Create New Client") {
            setValue("Name", filterClientData?.Name)
            setValue("IsActive", filterClientData?.IsActive)
            setValue("RentDate", filterClientData?.RentDate )
            setValue("RentDateComments", filterClientData?.RentDateComments)
            setValue("WhatsAppNo", filterClientData?.WhatsAppNo)
            setValue("CallingNo", filterClientData?.CallingNo)
            setValue("EmailID", filterClientData?.EmailID)
            setValue("DOJ", filterClientData?.DOJ ? new Date(filterClientData.DOJ).toLocaleDateString('en-CA') 
                : "")
            setValue("TemporaryPropCode", filterClientData?.TemporaryPropCode)
            setValue("ActualDOJ", filterClientData?.ActualDOJ ? new Date(filterClientData.DOJ).toLocaleDateString('en-CA') : "")
            setValue("EmgyCont1FullName", filterClientData?.EmgyCont1FullName)
            setValue("EmgyCont1No", filterClientData?.EmgyCont1No)
            setValue("EmgyCont2FullName", filterClientData?.EmgyCont2FullName)
            setValue("EmgyCont2No", filterClientData?.EmgyCont2No)
            setValue("BloodGroup", filterClientData?.BloodGroup)
            setValue("Occupation", filterClientData?.Occupation)
            setValue("Organization", filterClientData?.Organization)
            setValue("NoticeSD", filterClientData?.NoticeSD ? new Date(filterClientData?.NoticeSD).toLocaleDateString('en-CA') : "")
            setValue("NoticeLD", filterClientData?.NoticeLD ? new Date(filterClientData?.NoticeLD).toLocaleDateString('en-CA'): "")
            setValue("ActualVD", filterClientData?.ActualVD ? new Date(filterClientData.ActualVD).toLocaleDateString('en-CA') : "")
            setValue("ParkingCharges", filterClientData?.ParkingCharges)
            setValue("Comments", filterClientData?.Comments)
        }
    }, [ filterClientData ])

    useEffect(() => {
        reset()
    }, [mode])

    const MemoizedSelect = memo(({ field, options, placeholder, isDisabled, onChange, styles }) => (
        <Select
            {...field}
            value={options?.find((opt) => opt.value === field.value)}
            isDisabled={isDisabled}
            options={options}
            placeholder={placeholder}
            styles={styles}
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
            isClearable
            isSearchable
            menuShouldScrollIntoView={false}
        />
    ));

    const employeeSelectStyles = {
        control: (base, state) => ({
            ...base,
            padding: "0.25rem 0.5rem",
            marginTop: "0.30rem",
            borderWidth: "1px",
            borderColor: state.isFocused ? "#fb923c" : "#f97316",
            borderRadius: "0.375rem",
            boxShadow: state.isFocused ? "0 0 0 2px rgba(251,146,60,0.5)" : "0 1px 2px rgba(0,0,0,0.05)",
            backgroundColor: "white",
            minHeight: "40px",
            "&:hover": { borderColor: "#fb923c" },
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "#fb923c",
            backgroundColor: state.isSelected ? "#fb923c" : "white",
            "&:hover": { backgroundColor: "#fed7aa" },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    const propertyOptions = propertyDetails?.data?.map((ele) => ({
        value: ele["Property Code"],
        label: ele["Property Code"],
    })) || [];

    const isActiveOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
    ];

    // const isActiveOptions = [
    //     { value: 'Yes', label: 'Yes' },
    //     { value: 'No', label: 'No' },
    // ];

    const { mutate: updateClientCreation, isPending: isUpdatingClientCreation } = useUpdateClientCreation();

    const onSubmit = (data) => {
        // console.log("Submitted Data:", data);
        const updatedData = {
            ...data,
            Role: "client",
            // mode: mode,
            DOJ: data.DOJ ? new Date(data.DOJ).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "",
            ActualDOJ: data.ActualDOJ ? new Date(data.ActualDOJ).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "",
            RentDate: data.RentDate ,
            NoticeSD: data.NoticeSD ? new Date(data.NoticeSD).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "",
            NoticeLD: data.NoticeLD ? new Date(data.NoticeLD).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "",
            ActualVD: data.ActualVD ? new Date(data.ActualVD).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "",
            IsActive: data.IsActive || "Yes",                               
            CreatedByID: filterClientData?.CreatedByID ? filterClientData?.CreatedByID : decryptedUser?.id,
            CreatedDate: filterClientData?.CreatedDate ? filterClientData?.CreatedDate :  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            // CreatedByName: decryptedUser?.name,
            ...(mode !== "Create New Client"
                ? {
                    UpdatedByID: decryptedUser?.id,
                    UpdatedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                }
                : {}),
            LoginID: data.EmailID,
            // Current date in YYYY-MM-DD format
        }

        updateClientCreation(updatedData, {
            onSuccess: () => {
                if (mode !== "Update Client") {
                    toast.dismiss()
                    toast.success("New Client Created successfully")
                } else {
                    toast.dismiss()
                    toast.success("Client Updated successfully")
                }
            }
        });

    };

    const inputClass = 'w-full px-3 py-2 mt-1 border border-orange-500 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400';

    return (

        <div className='min-h-screen w-screen bg-[#E5E7EB] px-10 flex flex-col py-36'>
            {/* <h3 className="text-xl font-semibold mb-4 pb-2 bg-orange-300 text-black p-2 rounded-sm">Client Details</h3> */}

            <div className=" flex gap-4 rounded-t-xl  border-b-2 bg-white pt-5 pl-5">
                {["Create New Client", "Update Client"].map((ele, index) => (
                    <button
                        key={index}
                        onClick={() => setMode(ele)}

                        className={`px-4 text-[20px] md:text-[20px] py-2 ${mode === ele ? 'bg-orange-300 text-black rounded-t-lg' : ''
                            }`}
                    >
                        {ele}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm  py-5 rounded-b-lg px-10 max-w-8xl w-full">
                {/* <h3 className="text-xl font-semibold mb-4 pb-2 bg-orange-300 text-black p-2 rounded-sm">Client Details</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {/* Property Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Property Code <span className="text-red-500">*</span></label>
                        <Controller
                            name="PropertyCode"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <MemoizedSelect
                                    field={field}
                                    options={propertyOptions}
                                    placeholder="Search & Select"
                                    styles={employeeSelectStyles}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.PropertyCode && <p className="text-red-500 text-sm">{errors.PropertyCode.message}</p>}
                    </div>

                    {/* Client ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Client ID <span className="text-red-500">*</span></label>
                        <Controller
                            name="ClientID"
                            control={control}
                            defaultValue=""
                            render={({ field }) => {
                                const selectedPropertyCode = watch("PropertyCode");

                                const clientOptions = clientDetails?.data
                                    ?.filter(ele => ele?.PropertyCode === selectedPropertyCode)
                                    ?.map(ele => ({ value: ele.ClientID, label: ele.ClientID })) || []
                                return (
                                    <MemoizedSelect
                                        field={field}
                                        options={clientOptions[0]?.value ? clientOptions : []}
                                        placeholder="Search & Select"
                                        styles={employeeSelectStyles}
                                        onChange={field.onChange}
                                    />
                                );
                            }}
                        />

                        {errors.ClientID && <p className="text-red-500 text-sm">{errors.ClientID.message}</p>}
                    </div>

                    {/* Active */}
                    {mode === "Update Client" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Active <span className="text-red-500">*</span></label>
                            <Controller
                                name="IsActive"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <MemoizedSelect
                                        field={field}
                                        options={isActiveOptions}
                                        placeholder="Select Status"
                                        styles={employeeSelectStyles}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.IsActive && <p className="text-red-500 text-sm">{errors.IsActive.message}</p>}
                        </div>
                    )}


                    {/* Temporary Property Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Temporary Property Code</label>
                        <Controller
                            name="TemporaryPropCode"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <MemoizedSelect
                                    field={field}
                                    options={propertyOptions}
                                    placeholder="Search & Select"
                                    styles={employeeSelectStyles}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {/* {errors.TemporaryPropertyCode && <p className="text-red-500 text-sm">{errors.TemporaryPropertyCode.message}</p>} */}
                    </div>

                    {/* Text Inputs */}
                    {[
                        { name: 'RentDate', label: 'Rent Date', type: "Number" },
                        { name: 'RentDateComments', label: 'Rent Date Comments' },
                        { name: 'Name', label: 'Full Name' },
                        { name: 'WhatsAppNo', label: 'WhatsApp No', type: "number" },
                        { name: 'CallingNo', label: 'Calling No', type: "number" },
                        { name: 'EmailID', label: 'Email ID', type: "email" },
                        { name: 'DOJ', label: 'DOJ', type: "date" },
                        { name: 'ActualDOJ', label: 'Actual DOJ', type: "date" },
                        { name: 'EmgyCont1FullName', label: 'Emergency Cont1 Full Name' },
                        { name: 'EmgyCont1No', label: 'Emergency Cont1 No' },
                        { name: 'EmgyCont2FullName', label: 'Emergency Cont2 Full Name' },
                        { name: 'EmgyCont2No', label: 'Emergency Cont2 No' },
                        { name: 'BloodGroup', label: 'Blood Group' },
                        { name: 'Occupation', label: 'Occupation' },
                        { name: 'Organization', label: 'Organization' },
                        { name: 'NoticeSD', label: 'Notice Start Date', type: "date" },
                        { name: 'NoticeLD', label: 'Notice Last Date', type: "date" },
                        { name: 'ActualVD', label: 'Actual Vacate Date', type: "date" },
                        { name: 'ParkingCharges', label: 'Parking Charges' },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label} {["RentDateComments", "ActualDOJ", "EmgyCont2FullName", "EmgyCont2No", "BloodGroup", "NoticeSD", 'NoticeLD', 'ActualVD' , "Occupation" , "Organization" ].includes(field.name) ? "" : <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={field.type || 'text'}
                                {...register(field.name)}
                                placeholder={`Enter ${field.label}`}
                                className={inputClass}
                            />
                            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]?.message}</p>}
                        </div>
                    ))}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">2 Wheeler</label>
                        <Controller
                            name="2Wheeler"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <MemoizedSelect
                                    field={field}
                                    options={VehicleOptions}
                                    placeholder="Select Status"
                                    styles={employeeSelectStyles}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.IsActive && <p className="text-red-500 text-sm">{errors.IsActive.message}</p>}
                    </div>  */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">4 Wheeler</label>
                        <Controller
                            name="3Wheeler"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <MemoizedSelect
                                    field={field}
                                    options={VehicleOptions}
                                    placeholder="Select & Status"
                                    styles={employeeSelectStyles}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.IsActive && <p className="text-red-500 text-sm">{errors.IsActive.message}</p>}
                    </div> */}
                    {/* Description */}
                    <div className="col-span-1 ">
                        <label className="block text-sm font-medium text-gray-700">Comments </label>
                        <textarea
                            {...register("Comments")}
                            rows={4}
                            placeholder="Enter Your Comments here"
                            className="w-full h-[50px] border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
                        />
                        {/* {errors.Comments && (
                            <p className="text-red-500 text-sm">{errors.Comments.message}</p>
                        )} */}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center ">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-orange-300 hover:bg-orange-400 text-black font-semibold rounded"
                    >
                        {isUpdatingClientCreation ? <span><LoaderPage /> Submit...</span> : "Submit"}
                    </button>
                </div>
            </form>

        </div>





    );
};

export default CreateClient;
