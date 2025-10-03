import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "./AppProvider";
import { TicketFilters } from "./TicketFilters";

// Memoized row
const TicketRow = React.memo(({ ticket, headers, formatDate, onEdit, onImageClick }) => {
    return (
        <tr key={ticket.TicketID} className="hover:bg-[#F8F9FB] border">
            {headers.map(({ key }, index) => {
                const value = ticket[key];

                const isTicketID = key === "TicketID";
                const stickyStyle = isTicketID
                    ? "sticky left-0 bg-white z-20 px-4 py-3 bg-orange-300 whitespace-nowrap text-gray-900 font-semibold border-r"
                    : "px-4 py-3 whitespace-nowrap text-gray-900 ";

                if (key === "Status") {
                    return (
                        <td key={key} className={stickyStyle}>
                            <span className="px-2 py-1 rounded-full">{value}</span>
                        </td>
                    );
                }

                if (key === "Title") {
                    return (
                        <td key={key} className={stickyStyle}>
                            <div>
                                <div className="font-medium">{value?.substring(0, 25) || "N/A"}...</div>
                                <div className="text-xs text-gray-500 break-words max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
                                    {ticket.Description ? `${ticket.Description.substring(0, 60)}...` : "No Description"}
                                </div>
                            </div>
                        </td>
                    );
                }

                if (key === "Attachment") {
                    return (
                        <td key={key} className={stickyStyle}>
                            <div className="flex gap-2 mt-1 max-h-48 overflow-auto">
                                {value ? (
                                    value.split(",").map((url, idx) => {
                                        const trimmedUrl = url.trim();
                                        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(trimmedUrl);
                                        if (!isImage) return null;

                                        return (
                                            <div
                                                key={idx}
                                                className="w-10 h-10 border rounded-md overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-400"
                                                title={trimmedUrl}
                                                onClick={() => onImageClick(trimmedUrl)}
                                            >
                                                <img
                                                    src={trimmedUrl}
                                                    alt={`Attachment ${idx + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500">No Attachments</p>
                                )}
                            </div>
                        </td>
                    );
                }

                if (key === "DateCreated") {
                    return (
                        <td key={key} className={stickyStyle}>
                            {formatDate(value)}
                        </td>
                    );
                }

                if (key === "WorkLogs") {
                    return (
                        <td key={key} className={stickyStyle}>
                            <div className="relative group">
                                <div className="text-xs text-gray-700 cursor-pointer whitespace-pre-wrap break-words max-w-[1000px]">
                                    {value ? `${value.substring(0, 28)}` : "No WorkLogs"}
                                </div>
                                {value && (
                                    <div className="absolute z-50 hidden group-hover:block bg-white border p-3 rounded shadow-md w-96 max-h-96 overflow-y-auto cursor-pointer top-full mt-1 left-0 whitespace-pre-wrap break-words text-sm">
                                        {value}
                                    </div>
                                )}
                            </div>
                        </td>
                    );
                }

                // Default case for other columns:
                return (
                    <td key={key} className={stickyStyle}>
                        {value || "N/A"}
                    </td>
                );
            })}

            {/* Actions */}
            <td className="px-5 py-7 flex gap-3 whitespace-nowrap text-lg font-medium sticky border-l right-0 bg-white z-10">
                <button
                    onClick={() => onEdit(ticket)}
                    className="text-red-600 hover:text-red-900"
                    title="View"
                >
                    <i className="fa fa-eye"></i>
                </button>

                <button
                    onClick={() => onEdit(ticket)}
                    className="text-green-600 hover:text-green-900 mr-3"
                    title="Edit"
                >
                    <i className="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    );
});



export const TicketList = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { decryptedUser } = useApp();


    const TICKETS_PER_PAGE = 10;

    const {
        filteredTickets,
        setCurrentView,
        setSelectedTicket,
    } = useApp();


    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTickets]);

    const totalPages = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * TICKETS_PER_PAGE;
        return filteredTickets.slice(start, start + TICKETS_PER_PAGE);
    }, [filteredTickets, currentPage]);

    const editTicket = (ticket) => {
        setSelectedTicket(ticket);
        setCurrentView("edit");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const [datePart, timePart] = dateString.split(",").map((str) => str.trim());
        const [day, month, year] = datePart.split("/");
        const [hour = "00", minute = "00", second = "00"] = (timePart || "").split(":");
        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
        const date = new Date(isoString);
        if (isNaN(date)) return "Invalid Date";
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const formatted = date.toLocaleString("en-GB", options);
        const [dPart, tPart] = formatted.split(", ");
        return `${dPart}, ${tPart.toUpperCase()}`;
    };

    const fullHeaders = [
        { label: "TicketID", key: "TicketID" },
        { label: "Date Created", key: "DateCreated" },
        { label: "Property Code", key: "PropertyCode" },
        { label: "Title", key: "Title" },
        { label: "Attachment", key: "Attachment" },
        { label: "Customer Impacted", key: "CustomerImpacted" },
        { label: "Escalated", key: "Escalated" },
        { label: "Target Date", key: "TargetDate" },
        { label: "Category", key: "Category" },
        { label: "Status", key: "Status" },
        { label: "Priority", key: "Priority" },
        { label: "Department", key: "Department" },
        { label: "Manager", key: "Manager" },
        { label: "Assignee", key: "Assignee" },
        { label: "Client ID", key: "ClientID" },
        { label: "Employee ID", key: "EmployeeID" },
        { label: "Created By Id", key: "CreatedById" },
        { label: "Created By Name", key: "CreatedByName" },
        { label: "Closed Date", key: "ClosedDate" },
        { label: "Updated By ID", key: "UpdatedById" },
        { label: "Updated By Name", key: "UpdatedByName" },
        { label: "Updated Date Time", key: "UpdatedDateTime" },
        { label: "WorkLogs", key: "WorkLogs" },
        { label: "Internal Comments", key: "InternalComments" },
        { label: "Estimated Time To Resolve", key: "EstimatedTimeToResolve" },
        { label: "Actual Time Spent", key: "ActualTimeSpent" },
    ];

    const clientHeaders = [
        { label: "Ticket ID", key: "TicketID" },
        { label: "Date Created", key: "DateCreated" },
        { label: "Property Code", key: "PropertyCode" },
        { label: "Department", key: "Department" },
        { label: "Category", key: "Category" },
     { label: "Attachment", key: "Attachment" },
        { label: "Status", key: "Status" },
        { label: "WorkLogs", key: "WorkLogs" },
        { label: "Title", key: "Title" },
        { label: "Description", key: "Description" },
         // Assuming this key exists in data
    ];
    const headers = useMemo(() => {
        if (decryptedUser?.role === "client") {
            return clientHeaders;
        }
        return fullHeaders;
    }, [decryptedUser]);

    return (
        <div className="space-y-6">
            <TicketFilters />

            <div className="bg-white rounded-lg shadow overflow-auto">
                <table className="min-w-full divide-gray-200 text-sm">
                    <thead className="bg-orange-300">
                        <tr>
                            {headers.map(({ label, key }) => (
                                <th
                                    key={label}
                                    className={`px-6 py-3 text-left font-bold text-black text-lg whitespace-nowrap max-w-[200px] ${key === "TicketID" ? "sticky left-0 z-20 bg-orange-300" : ""}`}
                                    title={label}
                                >
                                    {label.substring(0, 20)}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-black font-bold text-lg sticky right-0 bg-orange-300 z-10 max-w-[150px]" title="Actions">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y text-[18px] divide-gray-200">
                        {paginatedTickets.map((ticket) => (
                            <TicketRow
                                key={ticket.TicketID}
                                ticket={ticket}
                                headers={headers}
                                formatDate={formatDate}
                                onEdit={editTicket}
                                onImageClick={setSelectedImage}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 pb-5">
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-orange-400 text-white rounded disabled:opacity-50"
                >
                    <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 bg-orange-400 text-white rounded disabled:opacity-50"
                >
                    Next <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 cursor-pointer"
                >
                    <img
                        src={selectedImage}
                        alt="Full View"
                        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );
};
