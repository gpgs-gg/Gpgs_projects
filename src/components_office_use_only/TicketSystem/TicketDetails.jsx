import { useState } from "react";
import { useApp } from "./AppProvider";

export        const TicketDetails = () => {
            const { selectedTicket, updateTicket, addWorkLog, users, setCurrentView } = useApp();
            const [newWorkLog, setNewWorkLog] = useState('');
            const [showWorkLogForm, setShowWorkLogForm] = useState(false);

            if (!selectedTicket) {
                return (
                    <div className="text-center py-12">
                        <i className="fas fa-ticket-alt text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-xl font-semibold text-gray-600">No ticket selected</h2>
                        <button
                            onClick={() => setCurrentView('tickets')}
                            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                        >
                            View All Tickets
                        </button>
                    </div>
                );
            }

            const handleStatusChange = (newStatus) => {
                updateTicket(selectedTicket.id, { status: newStatus });
            };

            const handleAddWorkLog = (e) => {
                e.preventDefault();
                if (newWorkLog.trim()) {
                    addWorkLog(selectedTicket.id, newWorkLog);
                    setNewWorkLog('');
                    setShowWorkLogForm(false);
                }
            };

            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => setCurrentView('tickets')}
                                className="text-orange-600 hover:text-orange-800 mb-2"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>Back to Tickets
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.id}</h2>
                            <p className="text-gray-600">{selectedTicket.title}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowWorkLogForm(!showWorkLogForm)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                <i className="fas fa-plus mr-2"></i>Add Work Log
                            </button>
                            <button 
                                onClick={() => setCurrentView('edit')}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                                <i className="fas fa-edit mr-2"></i>Edit
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Ticket Info */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-medium text-gray-600">Description:</span>
                                        <p className="mt-1 text-gray-900">{selectedTicket.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-medium text-gray-600">Status:</span>
                                            <div className="mt-1">
                                                <select
                                                    value={selectedTicket.status}
                                                    onChange={(e) => handleStatusChange(e.target.value)}
                                                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                >
                                                    <option value="Open">Open</option>
                                                    <option value="Assigned">Assigned</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Priority:</span>
                                            <div className="mt-1">
                                                <span className={`px-2 py-1 text-xs rounded-full priority-${selectedTicket.priority.toLowerCase()}`}>
                                                    {selectedTicket.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-medium text-gray-600">Department:</span>
                                            <p className="mt-1">{selectedTicket.department}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Property Code:</span>
                                            <p className="mt-1">{selectedTicket.propertyCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add Work Log Form */}
                            {showWorkLogForm && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-4">Add Work Log</h3>
                                    <form onSubmit={handleAddWorkLog}>
                                        <textarea
                                            value={newWorkLog}
                                            onChange={(e) => setNewWorkLog(e.target.value)}
                                            rows="4"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Describe the work done, time spent, next steps..."
                                            required
                                        ></textarea>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                type="submit"
                                                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                                            >
                                                Add Log
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowWorkLogForm(false)}
                                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Work Logs Timeline */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
                                <div className="space-y-4">
                                    {selectedTicket.workLogs.map((log, index) => (
                                        <div key={log.id} className="relative pl-6 timeline-item">
                                            <div className="absolute left-0 top-0 w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow"></div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-medium text-gray-900">{log.user}</span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 text-sm">{log.message}</p>
                                                <div className="mt-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        log.type === 'created' ? 'bg-green-100 text-green-800' :
                                                        log.type === 'assigned' ? 'bg-orange-100 text-orange-800' :
                                                        log.type === 'update' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {log.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Assignment */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Assignment</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Assigned To:</span>
                                        <p className="mt-1">{selectedTicket.assignedTo || 'Unassigned'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Created By:</span>
                                        <p className="mt-1">{selectedTicket.createdBy}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Created Date:</span>
                                        <p className="mt-1">{selectedTicket.createdDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                        <i className="fas fa-user-plus mr-2"></i>Reassign Ticket
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                        <i className="fas fa-clock mr-2"></i>Set Due Date
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                        <i className="fas fa-tag mr-2"></i>Add Labels
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                        <i className="fas fa-link mr-2"></i>Link Tickets
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
