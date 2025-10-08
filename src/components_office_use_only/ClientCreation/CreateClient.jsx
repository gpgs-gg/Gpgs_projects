import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import { useClientDetails, usePropertyData } from './services';


const CreateClient = () => {
    const MemoizedSelect = memo(({ field, options, placeholder, isDisabled, onChange, styles }) => (
        <Select
            {...field}
            value={options?.find((opt) => opt.value === (field.value?.value || field.value))}
            isDisabled={isDisabled}
            options={options}
            placeholder={placeholder}
            styles={styles}
            onChange={onChange}
                                        
            isClearable
            isSearchable
            menuShouldScrollIntoView={false}
        />
    ));
    const employeeSelectStyles = {
        control: (base, state) => ({
            ...base,
            width: "100%",
            paddingTop: "0.25rem",
            paddingBottom: "0.10rem",
            paddingLeft: "0.75rem",
            paddingRight: "0.50rem",
            marginTop: "0.30rem",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: state.isFocused ? "#fb923c" : "#fdba74",
            borderRadius: "0.375rem",
            boxShadow: state.isFocused
                ? "0 0 0 2px rgba(251,146,60,0.5)"
                : "0 1px 2px rgba(0,0,0,0.05)",
            backgroundColor: "white",
            minHeight: "40px",
            "&:hover": { borderColor: "#fb923c" },
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "#fb923c",
            backgroundColor: state.isSelected ? "#fb923c" : "white",
            "&:hover": { backgroundColor: "#fed7aa" }
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999
        })
    };

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(),
        // context: { showPermanent, showtemporary },
    });

    const { data: clientDetails } = useClientDetails()
    const { data: propertyDetails } = usePropertyData()

    const inputClass = 'w-full px-3 py-2 mt-1 border-2 border-orange-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400';

    return (
        <div className='h-screen w-screen flex justify-center py-24 '>
            <section className="bg-white rounded-lg p-5 max-w-8xl w-full ">
                <h3 className="text-xl font-semibold mb-4  pb-2 bg-orange-300 text-black p-2 rounded-sm">Client Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-red-500">Property Code</label>
                        <Controller
                            name="PropertyCode"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => {
                                const options = propertyDetails?.data
                                    ?.filter((ele) => ele["Property Code"]) // only include entries that have ClientID
                                    ?.map((ele) => ({
                                        value: `${ele["Property Code"]}`,
                                        label: `${ele["Property Code"]}`,
                                    }));

                                return (
                                    <MemoizedSelect
                                        field={field}
                                        options={options}
                                        placeholder="Search & Select"
                                        styles={employeeSelectStyles}
                                        onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
                                    />
                                );
                            }}
                        />
                        {/* {renderError('AskForBAOrFA')} */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-red-500">Client ID</label>
                        <Controller
                            name="AskForBAOrFA"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => {
                                const options = clientDetails?.data
                                    ?.filter((ele) => ele?.ClientID && ele?.PropertyCode === watch("PropertyCode")) // only include entries that have ClientID
                                    ?.map((ele) => ({
                                        value: `${ele.ClientID}`,
                                        label: `${ele.ClientID}`,
                                    }));


                                return (
                                    <MemoizedSelect
                                        field={field}
                                        options={options}
                                        placeholder="Search & Select"
                                        styles={employeeSelectStyles}
                                        onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
                                    />
                                );
                            }}
                        />
                        {/* {renderError('AskForBAOrFA')} */}
                    </div>
                    {[
                        { name: 'ClientFullName', label: 'Full Name' },
                        { name: 'WhatsAppNo', label: 'WhatsApp No' },
                        { name: 'CallingNo', label: 'Calling No', type: "number" },
                        { name: 'EmailID', label: 'Email ID', type: "email" },
                        { name: 'DOJ', label: 'DOJ', type: "date" },
                        { name: 'ActualDoj', label: 'Actual DOJ', type: "date" },
                        { name: 'EmgyCont1FullName', label: 'Emergency Contact1 Full Name' },
                        { name: 'EmgyCont1No', label: 'Emergency Contact1 No' },
                        { name: 'EmgyCont2FullName', label: 'Emergency Contact2 Full Name' },
                        { name: 'EmgyCont2No', label: 'Emergency Contact2 No' },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-red-500"
                            >{field.label}</label>
                            <input
                                type={field.type || 'text'}
                                {...register(field.name)}
                                placeholder={`Enter ${field.label}`}
                                className={inputClass}
                            />
                            {/* {renderError(field.name)} */}
                        </div>
                    ))}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-red-500">AskFor ₹</label>
                        <Controller
                            name="AskForBAOrFA"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => {
                                const options = AskFor?.map((ele) => ({
                                    value: `${ele.value} `,
                                    label: `${ele.label}`,
                                }));

                                return (
                                    <MemoizedSelect
                                        field={field}
                                        options={options}
                                        placeholder="Search & Select Ask For"
                                        styles={employeeSelectStyles}
                                        onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
                                    />
                                );
                            }}
                        />
                        {renderError('AskForBAOrFA')}
                    </div> */}
                </div>
            </section>
        </div>
    )
}

export default CreateClient
