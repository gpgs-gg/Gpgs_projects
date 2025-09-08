import { useForm } from "react-hook-form";
import { useApp } from "./AppProvider";
import { useState } from "react";

export     const UserManagement = () => {
            const { users, currentUser, addUser, updateUser, deleteUser } = useApp();
            const [showAddUser, setShowAddUser] = useState(false);
            const [editingUser, setEditingUser] = useState(null);
            const { register, handleSubmit, formState: { errors }, reset } = useForm();

            if (currentUser.role !== 'Admin') {
                return (
                    <div className="text-center py-12">
                        <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-xl font-semibold text-gray-600">Access Denied</h2>
                        <p className="text-gray-500">You don't have permission to access user management.</p>
                    </div>
                );
            }

            const onSubmit = (data) => {
                if (editingUser) {
                    updateUser(editingUser.id, data);
                    setEditingUser(null);
                } else {
                    addUser(data);
                }
                reset();
                setShowAddUser(false);
            };

            const handleEdit = (user) => {
                setEditingUser(user);
                setShowAddUser(true);
                reset(user);
            };

            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                            <p className="text-gray-600">Manage system users and their permissions</p>
                        </div>
                        
                        <button
                            onClick={() => {
                                setEditingUser(null);
                                setShowAddUser(true);
                                reset();
                            }}
                            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                        >
                            <i className="fas fa-plus mr-2"></i>Add User
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                                    user.role === 'Manager' ? 'bg-orange-100 text-orange-800' :
                                                    user.role === 'Leader' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {user.department}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    onClick={() => handleEdit(user)}
                                                    className="text-orange-600 hover:text-orange-900 mr-3"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => deleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add/Edit User Modal */}
                    {showAddUser && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                                    <button
                                        onClick={() => {
                                            setShowAddUser(false);
                                            setEditingUser(null);
                                            reset();
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            {...register('email', { 
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <select 
                                            {...register('role', { required: 'Role is required' })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Member">Member</option>
                                            <option value="Leader">Team Leader</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <select 
                                            {...register('department', { required: 'Department is required' })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Marketing">Marketing</option>
                                        </select>
                                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
                                    </div>
                                    
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
                                        >
                                            {editingUser ? 'Update User' : 'Add User'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddUser(false);
                                                setEditingUser(null);
                                                reset();
                                            }}
                                            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        };
