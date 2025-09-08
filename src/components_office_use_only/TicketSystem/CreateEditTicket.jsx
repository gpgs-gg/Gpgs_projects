import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useApp } from "./AppProvider";
import { useCreateTicket, useEmployeeDetails, usePropertMasteryData, useUpdateTicketSheetData } from "./Services";
import { useState } from "react";

const PriorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];
const StatusOptions = [
  { value: "Open", label: "Open" },
  { value: "Acknowledged", label: "Acknowledged" },
  { value: "In Progress", label: "In Progress" },
  { value: "On Hold", label: "On Hold" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Re-Open", label: "Re-Open" },
];

const DepartmentOptions = [
  { value: "Management", label: "Management" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Housekeeping", label: "Housekeeping" },
  { value: "Admin", label: "Admin" },
  { value: "Accounts", label: "Accounts" },
  { value: "Human Resource", label: "Human Resource" },
];

const ManagerOptions = [
  { value: "John Doe", label: "John Doe - Manager" },
  { value: "Jane Smith", label: "Jane Smith - Manager" },
  { value: "Alice Johnson", label: "Alice Johnson - Manager" },
  { value: "Bob Brown", label: "Bob Brown - Manager" },
];


const CategoryOptions = [
  // Accounts 
  { value: "Others", label: "Others" },
  { value: "Rent Receipt", label: "Rent Receipt" },
  { value: "F&F Settlement", label: "F&F Settlement" },
  { value: "Rent", label: "Rent" },
  { value: "Deposit", label: "Deposit" },
  //  Sales
  { value: "Notice", label: "Notice" },
  { value: "Agreement", label: "Agreement" },
  { value: "New Male PG", label: "New Male PG" },
  { value: "New Female PG", label: "New Female PG" },
  // Maintenance 
  { value: "No Water", label: "No Water" },
  { value: "No Power", label: "No Power" },
  { value: "Short Circuit", label: "Short Circuit" },
  { value: "Fan", label: "Fan" },
  { value: "Fan Rregulator", label: "Fan Rregulator" },
  { value: "Fan Switch", label: "Fan Switch" },
  { value: "Fan Capacitor", label: "Fan Capacitor" },
  { value: "Exhaust Fan", label: "Exhaust Fan" },
  { value: "LED Tubelight", label: "LED Tubelight" },
  { value: "LED Bulb", label: "LED Bulb" },
  { value: "Light Switch", label: "Light Switch" },
  { value: "Three Pin Socket", label: "Three Pin Socket" },
  { value: "Extension Board", label: "Extension Board" },
  { value: "Geyser", label: "Geyser" },
  { value: "Tap Leakage", label: "Tap Leakage" },
  { value: "Water Purifier", label: "Water Purifier" },
  { value: "Washing Machine", label: "Washing Machine" },
  { value: "Fridge", label: "Fridge" },
  { value: "WiFi", label: "WiFi" },
  { value: "AC", label: "AC" },
  { value: "AC Switch", label: "AC Switch" },
  { value: "AC Remote", label: "AC Remote" },
  { value: "Water Motor Pump", label: "Water Motor Pump" },
  { value: "Main Door", label: "Main Door" },
  { value: "Main Lock", label: "Main Lock" },
  { value: "Cupboard Door", label: "Cupboard Door" },
  { value: "Cupboard Lock", label: "Cupboard Lock" },
  { value: "Bedroom Door", label: "Bedroom Door" },
  { value: "Bedroom Lock", label: "Bedroom Lock" },
  { value: "Washroom Door", label: "Washroom Door" },
  { value: "Washroom Lock", label: "Washroom Lock" },
  { value: "Main Door", label: "Main Door" },
  { value: "Main Door", label: "Main Door" },
  { value: "Main Door", label: "Main Door" },

  //housekeeping
  { value: "Cleaning", label: "Cleaning" },
  { value: "Rat", label: "Rat" },
  { value: "Pest Control", label: "Pest Control" },
];


// 🎨 Orange theme for react-select
const orangeTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#fed7aa', // light orange hover
    primary: '#f97316',   // main orange
  },
});

export const CreateEditTicket = ({ isEdit = false }) => {
  const { addTicket, updateTicket, setCurrentView, users, selectedTicket } = useApp();
  const { mutate: submitBooking, isLoading: isBookingLoading } = useCreateTicket();
  const [previews, setPreviews] = useState([]);
  const { data: EmployeeDetails } = useEmployeeDetails();
  const { mutate: updateTicketData, isLoading: isticketUpdate } = useUpdateTicketSheetData();
  const {data: property} = usePropertMasteryData();
    console.log("property", property)

  const ManagerOptions = EmployeeDetails?.data
    ?.map(emp => ({
      value: emp.Name,
      label: `${emp.Name} - ${emp.Department || 'N/A'}`
    }));

  const ProperyOptions = property?.data?.map(prop => ({ value: prop["Property Code"], label:prop["Property Code"] }));

  const assignedToOptions = users.map(user => ({
    value: user.name,
    label: `${user.name} - ${user.role}`
  }));
  console.log("Selected Ticket for Edit:", isEdit);
  const defaultValues = isEdit && selectedTicket
    ? {
      Title: selectedTicket.Title,
      TicketID: selectedTicket.TicketID,
      Description: selectedTicket.Description,
      Priority: PriorityOptions.find(p => p.value === selectedTicket.Priority),
      Status: StatusOptions.find(p => p.value === selectedTicket.Status),
      Department: DepartmentOptions.find(d => d.value === selectedTicket.Department),
      Category: CategoryOptions.find(c => c.value === selectedTicket.Category),
      PropertyCode: selectedTicket.PropertyCode,
      Assignee: assignedToOptions.find(u => u.value === selectedTicket.assignedTo)
    }
    : {
      Title: '',
      Description: '',
      Priority: null,
      Department: null,
      Category: null,
      PropertyCode: '',
      assignedTo: null
    };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Combine existing files + newly selected ones
    const totalFiles = previews.length + selectedFiles.length;

    if (totalFiles > 4) {
      alert('⚠️ You can only upload up to 4 files.');
      return;
    }

    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
      file,
    }));

    // Update previews and form state
    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);

    // Update form value: collect the actual File objects
    setValue(
      'attachments',
      updatedPreviews.map((item) => item.file)
    );
  };


  const handleRemoveFile = (indexToRemove) => {
    const updated = previews.filter((_, index) => index !== indexToRemove);

    setPreviews(updated);

    // Update form value
    setValue('attachments', updated.map(item => item.file));
  };


  const onSubmit = (data) => {
    console.log("Form Data:", data.attachments);
    console.log("Previews:", data);

    // Convert attachments to array (assuming 'previews' is file name array)
    const attachmentArray = previews || [];

    // Format main ticket data
    const formattedData = {
      ...data,
      Priority: data.Priority?.value || '',
      PropertyCode: data.PropertyCode?.value || '',
      Department: data.Department?.value || '',
      Category: data.Category?.value || '',
      Assignee: data.Assignee?.value || '',
      Manager: data.Manager?.value || '',
    };


    // Format data for Google Sheets
    const googleSheetData = {
      ...formattedData,
      Attachment: attachmentArray, // Attachments as array of names
      Status: isEdit ? (data.Status?.value || '') : 'Open',
    };

    // 🔁 Handle ticket update or creation
    if (isEdit && selectedTicket) {
      // Optionally update local database
      // updateTicket(selectedTicket.id, formattedData);

      // Update Google Sheet
      updateTicketData(googleSheetData, {
        onSuccess: () => {
          alert("✅ Data successfully updated in Google Sheet!");
        },
      });
    } else {
      // Add new ticket
      // addTicket({ ...formattedData, Status: 'Open' });

      // Submit new data to Google Sheet
      submitBooking(googleSheetData, {
        onSuccess: () => {
          alert("✅ Data successfully sent to Google Sheet!");
        },
      });
    }

    // 🔄 Reset form and view
    reset();
    setCurrentView('tickets');
  };




  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Ticket' : 'Create New Ticket'}
        </h2>
        <p className="text-gray-600">
          {isEdit ? 'Update ticket details' : 'Fill in the details to create a new support ticket'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isEdit && selectedTicket && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Ticket id <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('TicketID', { required: 'TicketID is required' })}
                  disabled={isEdit}
                  className="w-full border border-orange-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Brief Description of the issue"
                />
                {errors.TicketID && <p className="text-red-500 text-sm mt-1">{errors.TicketID.message}</p>}
              </div>
            )}



            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register('Title', { required: 'Title is required' })}
                disabled={isEdit}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Brief Description of the issue"
              />
              {errors.Title && <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Property Code</label>
              <Controller
                control={control}
                name="PropertyCode"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={ProperyOptions}
                    placeholder="Select team member"
                    isClearable
                    theme={orangeTheme}
                  />
                )}
              />
            </div>

        
          </div>




 


          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('Description', { required: 'Description is required' })}
              rows="4"
              disabled={isEdit}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Detailed Description of the issue, steps to reproduce, expected behavior, etc."
            ></textarea>
            {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>}
          </div>

          <div className={`grid grid-cols-1 ${isEdit ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Priority</label>
              <Controller
                control={control}
                name="Priority"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={PriorityOptions}
                    placeholder="Select Priority"
                    theme={orangeTheme}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium  text-black mb-2">Department</label>
              <Controller
                control={control}
                name="Department"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={DepartmentOptions}
                    placeholder="Select Department"
                    theme={orangeTheme}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Category</label>
              <Controller
                control={control}
                name="Category"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={CategoryOptions}
                    placeholder="Select Category"
                    theme={orangeTheme}
                  />
                )}
              />
            </div>
            {isEdit && selectedTicket && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">Status</label>
                <Controller
                  control={control}
                  name="Status"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={StatusOptions}
                      placeholder="Select Category"
                      theme={orangeTheme}
                    />
                  )}
                />
              </div>
            )}
          </div>
          {isEdit && (

            <div>
              <label className="block text-sm font-medium text-black mb-2">Manager</label>
              <Controller
                control={control}
                name="Manager"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={ManagerOptions}
                    placeholder="Select team Manager"
                    isClearable
                    theme={orangeTheme}
                  />
                )}
              />
            </div>
          )}

          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">Assigee</label>
              <Controller
                control={control}
                name="Assignee"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={ManagerOptions}
                    placeholder="Select team member"
                    isClearable
                    theme={orangeTheme}
                  />
                )}
              />
            </div>
          )}

          {/* Preview Section */}
          <div className="flex flex-wrap gap-4">
            {previews.map((file, index) => (
              <div key={index} className="relative w-40 border rounded-md p-2 bg-gray-100 shadow-sm">

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 text-red-600 text-xs bg-white rounded-full px-2 shadow"
                >
                  ✕
                </button>

                {/* Image Preview */}
                {file.type.startsWith('image/') && (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-28 object-cover rounded"
                  />
                )}

                {/* Video Preview */}
                {file.type.startsWith('video/') && (
                  <video controls className="w-full h-28 object-cover rounded">
                    <source src={file.url} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}

                {/* PDF File */}
                {file.type === 'application/pdf' && (
                  <div className="flex items-center justify-center h-28 text-center">
                    <p className="text-sm text-black truncate">📄 {file.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>


          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Attachments (Max 4 files)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              {...register('attachments', {
                validate: files => !files || files.length <= 4 || 'Max 4 files allowed.',
              })}
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.attachments && (
              <p className="text-red-500 text-sm mt-1">
                {errors.attachments.message}
              </p>
            )}
          </div>

          {isEdit && (
            <div>
              <label htmlFor="">Work Logs</label>
              <textarea
                {...register('WorkLogs')}
                id="" placeholder="work logs" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" rows="4">
              </textarea>
            </div>
          )}


          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {isEdit ? 'Update Ticket' : 'Create Ticket'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('tickets')}
              className="border border-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
