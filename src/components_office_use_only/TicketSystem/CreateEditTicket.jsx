import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useApp } from "./AppProvider";
import CryptoJS from "crypto-js";
import { DepartmentOptions, StatusOptions, PriorityOptions, CategoryOptions, CusmoterImpactedOptions, SelectStyles, SECRET_KEY, Managers } from "../../Config";
import {
  useCreateTicket,
  useEmployeeDetails,
  usePropertMasteryData,
  useUpdateTicketSheetData,
} from "./Services";
import { useEffect, useState } from "react";
import LoaderPage from "../NewBooking/LoaderPage";

// Select dropdown options
// const PriorityOptions = [
//   { value: "Low", label: "Low" },
//   { value: "Medium", label: "Medium" },
//   { value: "High", label: "High" },
//   { value: "Critical", label: "Critical" },
// ];

// const StatusOptions = [
//   { value: "Open", label: "Open" },
//   { value: "Acknowledged", label: "Acknowledged" },
//   { value: "In Progress", label: "In Progress" },
//   { value: "On Hold", label: "On Hold" },
//   { value: "Resolved", label: "Resolved" },
//   { value: "Closed", label: "Closed" },
//   { value: "Cancelled", label: "Cancelled" },
//   { value: "Re-Open", label: "Re-Open" },
// ];

// const DepartmentOptions = [
//   { value: "Management", label: "Management" },
//   { value: "Marketing", label: "Marketing" },
//   { value: "Sales", label: "Sales" },
//   { value: "Maintenance", label: "Maintenance" },
//   { value: "Housekeeping", label: "Housekeeping" },
//   { value: "Admin", label: "Admin" },
//   { value: "Accounts", label: "Accounts" },
//   { value: "Human Resource", label: "Human Resource" },
// ];

// const CategoryOptions = [
//   { value: "Others", label: "Others" },
//   { value: "Rent Receipt", label: "Rent Receipt" },
//   { value: "F&F Settlement", label: "F&F Settlement" },
//   { value: "Rent", label: "Rent" },
//   { value: "Deposit", label: "Deposit" },
//   { value: "Notice", label: "Notice" },
//   { value: "Agreement", label: "Agreement" },
//   { value: "Handover", label: "Handover" },
//   { value: "Possession", label: "Possession" },
//   { value: "Shifting", label: "Shifting" },
//   { value: "New Male PG", label: "New Male PG" },
//   { value: "New Female PG", label: "New Female PG" },
//   { value: "No Water", label: "No Water" },
//   { value: "No Power", label: "No Power" },
//   { value: "Short Circuit", label: "Short Circuit" },
//   { value: "Fan", label: "Fan" },
//   { value: "Fan Rregulator", label: "Fan Rregulator" },
//   { value: "Fan Switch", label: "Fan Switch" },
//   { value: "Fan Capacitor", label: "Fan Capacitor" },
//   { value: "Exhaust Fan", label: "Exhaust Fan" },
//   { value: "LED Tubelight", label: "LED Tubelight" },
//   { value: "LED Bulb", label: "LED Bulb" },
//   { value: "Light Switch", label: "Light Switch" },
//   { value: "Three Pin Socket", label: "Three Pin Socket" },
//   { value: "Extension Board", label: "Extension Board" },
//   { value: "Geyser", label: "Geyser" },
//   { value: "Tap Leakage", label: "Tap Leakage" },
//   { value: "Water Purifier", label: "Water Purifier" },
//   { value: "Washing Machine", label: "Washing Machine" },
//   { value: "Fridge", label: "Fridge" },
//   { value: "WiFi", label: "WiFi" },
//   { value: "AC", label: "AC" },
//   { value: "AC Switch", label: "AC Switch" },
//   { value: "AC Remote", label: "AC Remote" },
//   { value: "Water Motor Pump", label: "Water Motor Pump" },
//   { value: "Main Door", label: "Main Door" },
//   { value: "Main Lock", label: "Main Lock" },
//   { value: "Cupboard Door", label: "Cupboard Door" },
//   { value: "Cupboard Lock", label: "Cupboard Lock" },
//   { value: "Bedroom Door", label: "Bedroom Door" },
//   { value: "Bedroom Lock", label: "Bedroom Lock" },
//   { value: "Washroom Door", label: "Washroom Door" },
//   { value: "Washroom Lock", label: "Washroom Lock" },
//   { value: "Cleaning", label: "Cleaning" },
//   { value: "Rat", label: "Rat" },
//   { value: "Pest Control", label: "Pest Control" },
// ];


// const CusmoterImpactedOptions = [
//   { value: "Yes", label: "Yes" },
//   { value: "No", label: "No" },
// ];

// 🎨 React Select Theme
// Orange color theme (for colors only)
// const SelectStyles = {
//   control: (base, state) => ({
//     ...base,
//     width: "100%",
//     paddingTop: "0.25rem",
//     paddingBottom: "0.10rem",
//     paddingLeft: "0.75rem",
//     paddingRight: "0.50rem",
//     marginTop: "0.30rem",
//     borderWidth: "1px",
//     borderStyle: "solid",
//     borderColor: state.isFocused ? "#fb923c" : "#f97316",
//     borderRadius: "0.375rem",
//     boxShadow: state.isFocused
//       ? "0 0 0 2px rgba(251,146,60,0.5)"
//       : "0 1px 2px rgba(0,0,0,0.05)",
//     backgroundColor: "white",
//     minHeight: "40px",
//     "&:hover": { borderColor: "#fb923c" },
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     color: state.isSelected ? "white" : "#fb923c",
//     backgroundColor: state.isSelected ? "#fb923c" : "white",
//     "&:hover": { backgroundColor: "#fed7aa" }
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999
//   })
// };

export const CreateEditTicket = ({ isEdit = false }) => {
  const { addTicket, updateTicket, setCurrentView, users, selectedTicket, modal } = useApp();
  const { mutate: submitBooking, isPending: isSubmittingBooking } = useCreateTicket();
  const { mutate: updateTicketData, isPending: isUpdatingTicket } = useUpdateTicketSheetData();

  const { data: EmployeeDetails } = useEmployeeDetails();
  const { data: property } = usePropertMasteryData();
  const [previousWlogs, setPreviousWlogs] = useState("");
  const [previews, setPreviews] = useState([]);
  const [decryptedUser, setDecryptedUser] = useState(null);



  useEffect(() => {
    setDecryptedUser(decryptUser(localStorage.getItem('user')))
      ; // Just to verify decryption works
  }, []);

  const decryptUser = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt user:', error);
      return null;
    }
  };


  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Title: "",
      TicketID: "",
      Description: "",
      Priority: null,
      PropertyCode: null,
      Department: null,
      Category: null,
      Assignee: null,
      Manager: null,
      Status: null,
      Attachment: [],
      WorkLogs: ""
    },
  });
  // Generate dynamic options
  // const ManagerOptions = EmployeeDetails?.data
  //   ?.filter((emp) => emp?.Name && emp.Designation.Managers) // Only include if Name is present
  //   .map((emp) => ({
  //     value: emp.Name,
  //     label: `${emp.Name} - ${emp.Department || "N/A"}`,
  //   })) || [];

  const ManagerOptions = EmployeeDetails?.data
    ?.filter(
      (emp) =>
        emp?.Name &&
        Managers.includes(emp?.Designation)
    )
    .map((emp) => ({
      value: emp.Name,
      label: `${emp.Name}`,
    })) || [];


  const assigneeOptions = [
    ...(EmployeeDetails?.data
      ?.filter((emp) => emp?.Name)
      .map((emp) => ({
        value: emp.Name,
        label: `${emp.Name}`,
      })) || [])
  ];






  const ProperyOptions = property?.data?.map((prop) => ({
    value: prop["Property Code"],
    label: prop["Property Code"],
  })) || [];

  // Set default values in edit mode
  useEffect(() => {
    if (isEdit && selectedTicket) {
      setValue("Title", selectedTicket.Title);
      setValue("TicketID", selectedTicket.TicketID);
      setValue("TargetDate", selectedTicket.TargetDate);
      setValue("CreatedByName", selectedTicket.CreatedByName);
      setValue("Description", selectedTicket.Description);
      setValue("Priority", PriorityOptions.find((p) => p.value === selectedTicket.Priority));
      setValue("PropertyCode", ProperyOptions.find((p) => p.value === selectedTicket.PropertyCode));
      setValue("Status", StatusOptions.find((s) => s.value === selectedTicket.Status));
      setValue("Department", DepartmentOptions.find((d) => d.value === selectedTicket.Department));
      setValue("Category", CategoryOptions.find((c) => c.value === selectedTicket.Category));
      setValue("Assignee", assigneeOptions.find((u) => u.value === selectedTicket.Assignee));
      setValue("Manager", ManagerOptions.find((u) => u.value === selectedTicket.Manager));
      setValue("CustomerImpacted", CusmoterImpactedOptions.find((u) => u.value === selectedTicket.CustomerImpacted));
      setValue("Escalated", CusmoterImpactedOptions.find((u) => u.value === selectedTicket.Escalated));

      setPreviousWlogs(selectedTicket.WorkLogs || "");

      // ✅ Only set previews once if not already set
      if (selectedTicket.Attachment && previews.length === 0) {
        const attachments = selectedTicket.Attachment.split(',').map((url) => ({
          url,
          type: '', // Optional: derive MIME type
          name: url.split('/').pop(),
          file: null, // Existing files shouldn't be re-uploaded
        }));
        setPreviews(attachments);
      }
    }
  }, [isEdit, selectedTicket, setValue, ProperyOptions, ManagerOptions]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filter out files larger than 5MB
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      alert(`⚠️ Some files are larger than 5 MB and were not added.`);
    }

    // Only keep files <= 5MB
    const validFiles = selectedFiles.filter(file => file.size <= maxSize);

    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|pdf|docx|txt)$/i;

    // Filter both arrays by extension
    const filteredPreviews = previews.filter(file => allowedExtensions.test(file.name));
    const filteredValidFiles = validFiles.filter(file => allowedExtensions.test(file.name));

    // Final count
    const totalFiles = filteredPreviews.length + filteredValidFiles.length;
    if (totalFiles > 10) {
      alert("⚠️ You can only upload up to 10 files.");
      return;
    }

    const newPreviews = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
      file,
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);

    setValue("Attachment", updatedPreviews.map((item) => item.file));
  };


  const handleRemoveFile = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    setValue("Attachment", updated.map((item) => item.file));
  };

  // for timeStap function  .............

  function getFormattedTimestamp() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' }); // "Sep"
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 → 12

    return `${day} ${month} ${year} ${hours}:${minutes}${ampm}`;
  }
  function getFormattedTimestampForTargetDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' }); // "Sep"
    const year = now.getFullYear();

    // let hours = now.getHours();
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // const ampm = hours >= 12 ? 'pm' : 'am';

    // hours = hours % 12;
    // hours = hours ? hours : 12; // 0 → 12

    return `${day} ${month} ${year} `;
  }


  function Timestamp() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  }


  const onSubmit = (data) => {
    const currentTimestamp = getFormattedTimestamp();

    // Format WorkLogs
    const newWorkLogEntry = data.WorkLogs
      ? `[${currentTimestamp} - ${decryptedUser?.name}]  ${data.WorkLogs.trim()}`
      : "";

    const statusValue = isEdit ? data.Status?.value || "" : "Open";
    const isStatusChanged = isEdit && selectedTicket?.Status !== data.Status?.value;

    // Compose WorkLogs
    let updatedWorkLogs = "";
    if (isStatusChanged) {
      const statusChangeLog = `[${currentTimestamp} - ${decryptedUser?.name}] Status changed from ${selectedTicket.Status} to ${data.Status?.value}`;
      updatedWorkLogs += statusChangeLog;
    }
    if (newWorkLogEntry) {
      updatedWorkLogs += `${updatedWorkLogs ? "\n\n" : ""}${newWorkLogEntry}`;
    }
    if (previousWlogs) {
      updatedWorkLogs += `${updatedWorkLogs ? "\n\n" : ""}${previousWlogs}`;
    }

    // Format data before sending
    const formattedData = {
      ...data,
      Priority: data.Priority?.value || "",
      PropertyCode: data.PropertyCode?.value || "",
      Department: data.Department?.value || "",
      Category: data.Category?.value || "",
      Assignee: data.Assignee?.value || "",
      Manager: data.Manager?.value || "",
      TargetDate:getFormattedTimestampForTargetDate(data.TargetDate)|| "",
      Status: statusValue,
      CustomerImpacted: data.CustomerImpacted?.value || "",
      Escalated: data.Escalated?.value || "",
      WorkLogs: updatedWorkLogs || "",
      // CreatedByName: decryptedUser?.name || "Unknown",
      // CreatedById: decryptedUser?.id || "Unknown",
      ClosedDate: statusValue === "Closed" ? Timestamp() : "",
      ...(isEdit
        ? {
          UpdatedByName: decryptedUser?.name || "Unknown",
          UpdatedById: decryptedUser?.id || "Unknown",
          UpdatedDateTime: Timestamp(),
          Attachment: previews.map(ele => ele.url),

        }
        : {
          CreatedByName: decryptedUser?.name || "Unknown",
          CreatedById: decryptedUser?.id || "Unknown",
        }),
    };
    const formData = new FormData();
      console.log("formattedData", formattedData)
    // 🔁 Append non-file data to FormData
    for (const key in formattedData) {
      const value = formattedData[key];

      // Skip appending 'images' key (handled separately)
      if (key === "images") continue;

      // Stringify objects (selects, nested fields)
      if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value ?? "");
      }
    }

    // 📸 Append each image file
    previews.forEach((file) => {
      formData.append("images", file.file); // 👈 Keep the key same for all files
    });

    // ✅ Submit
    const submissionFn = isEdit && selectedTicket ? updateTicketData : submitBooking;

    submissionFn(formData, {
      onSuccess: () => {
        alert(`✅ Ticket ${isEdit ? "updated" : "created"} successfully!`);
        reset();
        setCurrentView("tickets");
      },
    });

    // 🔍 If you want to inspect formData manually:
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? `View & Edit Ticket : ${selectedTicket?.TicketID}` : "Create New Ticket"}
      </h2>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Property Code, Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isEdit == "klsdfhl" && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">Ticket ID</label>
                <input
                  {...register("TicketID", { required: true })}
                  disabled
                  className="w-full border border-orange-300 rounded-md px-3 py-2"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">Property Code <span className="text-red-500">*</span></label>
              <Controller
                control={control}
                name="PropertyCode"
                rules={{ required: "Required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select {...field} isDisabled={isEdit}
                      options={ProperyOptions} styles={SelectStyles} isClearable placeholder="Search & Select Property Code" />
                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("Title", { required: "Title is required" })}
                disabled={isEdit}
                className={`w-full border ${isEdit ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  } border-orange-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300`}
                placeholder="Enter title"
              />
              {errors.Title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Title.message}
                </p>
              )}
            </div>


          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className=" flex flex-col justify-between">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Description <span className="text-red-500">*</span></label>
                <textarea
                  {...register("Description", { required: "Description is required" })}
                  rows={4}
                  disabled={isEdit}
                  placeholder="Enter Your Description here"
                  className="w-full h-[250px] border border-orange-500  focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
                />
                {errors.Description && (
                  <p className="text-red-500 text-sm">{errors.Description.message}</p>
                )}

              </div>



              {isEdit && (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Created By <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("CreatedByName", { required: "Created By Name is required" })}
                      disabled={isEdit}
                      className={`w-full border ${isEdit ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        } border-orange-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300`}
                      placeholder="Enter Created By Name"
                    />
                    {errors.Title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Title.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {[
                { name: "Department", options: DepartmentOptions, placeholder: "Select Department" },
                { name: "Category", options: CategoryOptions, placeholder: "select Category" },
                { name: "Priority", options: PriorityOptions, placeholder: "Select Priority" },
              ].map(({ name, options, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-black mb-2">{name} <span className="text-red-500">*</span></label>
                  <Controller
                    control={control}
                    name={name}
                    rules={{ required: `${name} is required` }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select {...field} options={options} styles={SelectStyles} placeholder={placeholder} isClearable />
                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              ))}

              {isEdit && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Status <span className="text-red-500">*</span></label>
                  <Controller
                    control={control}
                    name="Status"
                    rules={{ required: "Status is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select {...field} options={StatusOptions} styles={SelectStyles} isClearable />
                        {error && <p className="text-red-500 text-sm">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Manager & Assignee */}


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Manager</label>
              <Controller
                control={control}
                name="Manager"
                render={({ field }) => (
                  <Select {...field} options={ManagerOptions} isClearable styles={SelectStyles} />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Assignee </label>
              <Controller
                control={control}
                name="Assignee"
                render={({ field }) => (
                  <Select {...field} options={assigneeOptions} isClearable styles={SelectStyles} />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Target Date
              </label>
              <Controller
                control={control}
                name="TargetDate"
                defaultValue=""
                render={({ field }) => (
                  <div className="relative w-full">
                    <input
                      type="date"
                      {...field}
                      value={field.value || ""}
                      className="w-full border border-orange-500 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => field.onChange("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600"
                      >
                        &#10005;
                      </button>
                    )}
                  </div>
                )}
              />
            </div>

          </div>

          {isEdit && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Customer Impacted </label>
                  <Controller
                    control={control}
                    name="CustomerImpacted"
                    render={({ field }) => (
                      <Select {...field} options={CusmoterImpactedOptions} isClearable styles={SelectStyles} />
                    )}
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-black mb-2">Escalated </label>
                  <Controller
                    control={control}
                    name="Escalated"
                    render={({ field }) => (
                      <Select {...field} options={CusmoterImpactedOptions} isClearable styles={SelectStyles} />
                    )}
                  />
                </div>
              </div>
              <div>
                <div>

                </div>
                <label className="block text-sm font-medium text-black mb-2">Work Logs <span className="text-red-500">*</span></label>
                {previousWlogs && (
                  <div className="mb-2 p-2 bg-gray-100 border border-gray-300 rounded h-32 overflow-y-auto">
                    <pre className="text-xs text-black whitespace-pre-wrap">{previousWlogs}</pre>
                  </div>
                )}
                <textarea
                  {...register("WorkLogs")}
                  placeholder="Add work log entries here..."
                  rows={4}
                  className="w-full border border-orange-500  focus:outline-none focus:ring-2 focus:ring-orange-300  rounded-md px-3 py-2"
                />
              </div>
            </>
          )}

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {previews.map((file, index) => {
                const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
                const isImage = imageExtensions.test(file.name);

                if (!isImage) return null; // Skip non-image files

                return (
                  <div
                    key={index}
                    className="relative w-40 border rounded-md p-2 bg-gray-100 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 text-red-600 text-xs bg-white rounded-full px-2 shadow"
                    >
                      ✕
                    </button>

                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-28 object-cover rounded"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Attachment</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
              className="w-full h-[90%] border border-orange-500  focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 flex items-center justify-center gap-2"
              disabled={isSubmittingBooking || isUpdatingTicket}
            >
              {(isSubmittingBooking || isUpdatingTicket) ? (
                <>
                  <LoaderPage size="small" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Update Ticket' : 'Create Ticket'
              )}
            </button>



            <button
              type="button"
              onClick={() => setCurrentView("tickets")}
              className="border border-gray-300 text-black px-6 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEditTicket;
