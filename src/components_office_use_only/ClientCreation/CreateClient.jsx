import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import { useClientDetails, usePropertyData, useUpdateClientCreation } from './services';
import * as yup from "yup";

// ✅ Yup validation schema (example, modify based on real rules)
const schema = yup.object().shape({
    PropertyCode: yup.string().required("Property Code is required"),
    ClientID: yup.string().required("Client ID is required"),
    // IsActive: yup.string().required("Active status is required"),
    // TemporaryPropertyCode: yup.string().required("Temporary Property Code is required"),
    ClientFullName: yup.string().required("Full name is required"),
    // Comments: yup.string().required("Comments is required"),
});

const CreateClient = () => {
    const { data: clientDetails } = useClientDetails();
    const { data: propertyDetails } = usePropertyData();
    const [mode, setMode] = useState("Create")

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });





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
        const updatedData = {
            ...data,
            Role: "client", 
            mode: mode,
            IsActive: data.IsActive || "Yes", // Default to "Yes" if not selected
            CreatedByID: "Admin",
            CreatedByName: "Admin",
            LoginID : data.EmailID,
            CreatedDate: new Date().toISOString().split('T')[0]  // Current date in YYYY-MM-DD format
        }
        updateClientCreation(updatedData);
        console.log("Submitted Data:", updatedData);
    };

    const inputClass = 'w-full px-3 py-2 mt-1 border border-orange-500 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400';

    return (

        <div className='h-screen w-screen flex flex-col justify-center py-24'>

            <div className="mt-10 ml-10 flex gap-4 text-orange-600 font-semibold">
                {["Create", "Update"].map((ele, index) => (
                    <button
                        key={index}
                        onClick={() => setMode(ele)}
                        className={`px-4 py-2 rounded ${mode === ele ? "border-b-4 border-orange-600 bg-orange-100" : "border-b border-transparent"
                            }`}
                    >
                        {ele}
                    </button>
                ))}
            </div>

            {mode === "Create" && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-5 max-w-8xl w-full">
                    <h3 className="text-xl font-semibold mb-4 pb-2 bg-orange-300 text-black p-2 rounded-sm">Client Details</h3>
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

                        {/* Temporary Property Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Temporary Property Code <span className="text-red-500">*</span></label>
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
                            { name: 'RentDate', label: 'Rent Start Date', type: "date" },
                            { name: 'RentDateComments', label: 'Rent Date Comments' },
                            { name: 'Name', label: 'Full Name' },
                            { name: 'WhatsAppNo', label: 'WhatsApp No', type: "number" },
                            { name: 'CallingNo', label: 'Calling No', type: "number" },
                            { name: 'EmailID', label: 'Email ID', type: "email" },
                            { name: 'DOJ', label: 'DOJ', type: "date" },
                            { name: 'ActualDOJ', label: 'Actual DOJ', type: "date" },
                            { name: 'EmgyCont1FullName', label: 'Emergency Contact1 Full Name' },
                            { name: 'EmgyCont1No', label: 'Emergency Contact1 No' },
                            { name: 'EmgyCont2FullName', label: 'Emergency Contact2 Full Name' },
                            { name: 'EmgyCont2No', label: 'Emergency Contact2 No' },
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
                                    {field.label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type={field.type || 'text'}
                                    {...register(field.name)}
                                    placeholder={`Enter ${field.label}`}
                                    className={inputClass}
                                />
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
                            <label className="block text-sm font-medium text-gray-700">Comments <span className="text-red-500">*</span></label>
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
                            Submit
                        </button>
                    </div>
                </form>
            )}


            {mode === "Update" && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-5 max-w-8xl w-full">
                    <h3 className="text-xl font-semibold mb-4 pb-2 bg-orange-300 text-black p-2 rounded-sm">Client Details</h3>
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

                        {/* Temporary Property Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Temporary Property Code <span className="text-red-500">*</span></label>
                            <Controller
                                name="TemporaryPropertyCode"
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
                            { name: 'RentDate', label: 'Rent Start Date', type: "date" },
                            { name: 'RentDateComments', label: 'Rent Date Comments' },
                            { name: 'ClientFullName', label: 'Full Name' },
                            { name: 'WhatsAppNo', label: 'WhatsApp No', type: "number" },
                            { name: 'CallingNo', label: 'Calling No', type: "number" },
                            { name: 'EmailID', label: 'Email ID', type: "email" },
                            { name: 'DOJ', label: 'DOJ', type: "date" },
                            { name: 'ActualDoj', label: 'Actual DOJ', type: "date" },
                            { name: 'EmgyCont1FullName', label: 'Emergency Contact1 Full Name' },
                            { name: 'EmgyCont1No', label: 'Emergency Contact1 No' },
                            { name: 'EmgyCont2FullName', label: 'Emergency Contact2 Full Name' },
                            { name: 'EmgyCont2No', label: 'Emergency Contact2 No' },
                            { name: 'BloodGroup', label: 'Blood Group' },
                            { name: 'Occupation', label: 'Occupation' },
                            { name: 'Orgnization', label: 'Organization' },
                            { name: 'NoticeSD', label: 'Notice Start Date', type: "date" },
                            { name: 'NoticeLD', label: 'Notice Last Date', type: "date" },
                            { name: 'ActualVD', label: 'Actual Vacate Date', type: "date" },
                            { name: 'ParkingCharges', label: 'Parking Charges' },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type={field.type || 'text'}
                                    {...register(field.name)}
                                    placeholder={`Enter ${field.label}`}
                                    className={inputClass}
                                />
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
                            <label className="block text-sm font-medium text-gray-700">Comments <span className="text-red-500">*</span></label>
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
                            Submit
                        </button>
                    </div>
                </form>
            )}


        </div>





    );
};

export default CreateClient;
