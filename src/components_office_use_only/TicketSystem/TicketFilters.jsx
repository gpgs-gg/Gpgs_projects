import { useApp } from "./AppProvider";

export const TicketFilters = () => {
            const { filters, setFilters, users } = useApp();
               
            return (
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.Status}
                                onChange={(e) => setFilters({...filters, Status: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">All Status</option>
                                <option value="Open">Open</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={filters.Priority}
                                onChange={(e) => setFilters({...filters, Priority: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">All Priorities</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                value={filters.Department}
                                onChange={(e) => setFilters({...filters, Department: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">All Departments</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                            <select
                                value={filters.Assignee}
                                onChange={(e) => setFilters({...filters, Assignee: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">All Assignees</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.name}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        };
