import { useState } from "react";
import { useApp } from "./AppProvider";

export    const KanbanBoard = () => {
            const { tickets, updateTicket } = useApp();
            const [draggedTicket, setDraggedTicket] = useState(null);

            const columns = [
                { id: 'Open', title: 'Open', color: 'border-yellow-300', bgColor: 'bg-yellow-50' },
                { id: 'Assigned', title: 'Assigned', color: 'border-orange-300', bgColor: 'bg-orange-50' },
                { id: 'In Progress', title: 'In Progress', color: 'border-orange-300', bgColor: 'bg-orange-50' },
                { id: 'Resolved', title: 'Resolved', color: 'border-green-300', bgColor: 'bg-green-50' },
                { id: 'Closed', title: 'Closed', color: 'border-gray-300', bgColor: 'bg-[#F8F9FB]' }
            ];

            const handleDragStart = (e, ticket) => {
                setDraggedTicket(ticket);
            };

            const handleDragOver = (e) => {
                e.preventDefault();
            };
            const handleDrop = (e, newStatus) => {
                e.preventDefault();
                if (draggedTicket && draggedTicket.Status !== newStatus) {
                    updateTicket(draggedTicket.TicketID, { Status: newStatus });
                }
                setDraggedTicket(null);
            };

            return (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
                        <p className="text-gray-600">Drag and drop tickets to update their status</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {columns.map(column => {
                            const columnTickets = tickets.filter(ticket => ticket.Status === column.id);
                            
                            return (
                                <div
                                    key={column.id}
                                    className={`${column.bgColor} rounded-lg border-t-4 ${column.color} min-h-96`}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, column.id)}
                                >
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">{column.title}</h3>
                                            <span className="bg-white text-gray-600 rounded-full px-2 py-1 text-xs">
                                                {columnTickets.length}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 space-y-3">
                                        {columnTickets.map(ticket => (
                                            <div
                                                key={ticket.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, ticket)}
                                                className="bg-white p-3 rounded-lg shadow cursor-move hover:shadow-lg transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <span className="text-xs font-medium text-gray-500">{ticket.TicketID}</span>
                                                    <span className={`px-2 py-1 text-xs rounded-full priority-${ticket?.Priority?.toLowerCase()}`}>
                                                        {ticket?.Priority}
                                                    </span>
                                                </div>
                                                
                                                <h4 className="font-medium text-gray-900 mb-2 text-sm">
                                                    {ticket.Title}
                                                </h4>
                                                
                                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                                    {ticket.Description.substring(0, 80)}...
                                                </p>
                                                
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{ticket.Assignee || 'Unassigned'}</span>
                                                    <span>{ticket.DateCreated}</span>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {columnTickets.length === 0 && (
                                            <div className="text-center py-8 text-gray-400">
                                                <i className="fas fa-inbox text-2xl mb-2"></i>
                                                <p className="text-sm">No tickets</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        };
