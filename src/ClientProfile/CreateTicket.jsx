import React from 'react';
import { useForm } from 'react-hook-form';

const CreateTicket = ({ setCreateTicket, createTicket }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  if (!createTicket) return null;

  const onSubmit = (data) => {
    // Submit form to backend here

    // Reset form and close modal
    reset();
    setCreateTicket(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-4xl mx-4 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setCreateTicket(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Ticket</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Property Code */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Property Code <span className="text-orange-700">*</span>
            </label>
            <select
              {...register('propertyCode', { required: 'Property Code is required' })}
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.propertyCode
                  ? 'border-orange-700 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-orange-400'
              }`}
            >
              <option value="">Select Property Code</option>
              <option value="P001">P001 - Property 1</option>
              <option value="P002">P002 - Property 2</option>
            </select>
            {errors.propertyCode && (
              <span className="text-sm text-orange-700 mt-1">
                {errors.propertyCode.message}
              </span>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Department <span className="text-orange-700">*</span>
            </label>
            <select
              {...register('department', { required: 'Department is required' })}
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.department
                  ? 'border-orange-700 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-orange-400'
              }`}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {errors.department && (
              <span className="text-sm text-orange-700 mt-1">
                {errors.department.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-orange-700">*</span>
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.category
                  ? 'border-orange-700 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-orange-400'
              }`}
            >
              <option value="">Select Category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <span className="text-sm text-orange-700 mt-1">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-orange-700">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              {...register('title', { required: 'Title is required' })}
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-orange-700 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-orange-400'
              }`}
            />
            {errors.title && (
              <span className="text-sm text-orange-700 mt-1">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-orange-700">*</span>
            </label>
            <textarea
              placeholder="Enter your description here"
              rows={4}
              {...register('description', { required: 'Description is required' })}
              className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-orange-700 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-orange-400'
              }`}
            ></textarea>
            {errors.description && (
              <span className="text-sm text-orange-700 mt-1">{errors.description.message}</span>
            )}
          </div>

          {/* Attachment (optional) */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">Attachment (optional)</label>
            <input
              type="file"
              {...register('attachment')}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setCreateTicket(false)}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
