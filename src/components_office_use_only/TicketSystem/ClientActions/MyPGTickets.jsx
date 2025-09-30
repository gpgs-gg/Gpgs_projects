


import React, { useState, useMemo, useEffect } from "react";
// import { useApp } from "./AppProvider";
import { TicketFilters } from "../TicketFilters";
import { useApp } from "../AppProvider";






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
            <td className="px-5 py-7 flex gap-3 justify-center items-center whitespace-nowrap text-lg font-medium sticky border-l right-0 bg-white z-10">
                <button
                    onClick={() => onEdit(ticket)}
                    className="text-red-600 hover:text-red-900"
                    title="View"
                >
                    <i className="fa fa-eye"></i>
                </button>

                {/* <button
                    onClick={() => onEdit(ticket)}
                    className="text-green-600 hover:text-green-900 mr-3"
                    title="Edit"
                >
                    <i className="fas fa-edit"></i>
                </button> */}
            </td>
        </tr>
    );
});

export const MyPGTickets = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewTicket, setViewTicket] = useState(null);

    const { decryptedUser, setMyPgTicketsTotal, filteredTickets, setCurrentView, setSelectedTicket } = useApp();

    const TICKETS_PER_PAGE = 10;

    const now = new Date();
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago

    // Filter only tickets belonging to user's property and are not resolved or recently updated
    const myFilteredTickets = useMemo(() => {
        if (!filteredTickets) return [];

        return filteredTickets.filter((ticket) => {
            const isSameProperty = ticket.PropertyCode === decryptedUser.propertyCode;

            const [datePart, timePart] = ticket.UpdatedDateTime.split(", ");
            const [day, month, year] = datePart.split("/");
            const ticketUpdatedDate = new Date(`${month}/${day}/${year} ${timePart}`);

            const isRecentOrUnresolved =
                ticket.Status !== "Resolved" || ticketUpdatedDate >= tenDaysAgo;

            return isSameProperty && isRecentOrUnresolved;
        });
    }, [filteredTickets, decryptedUser.propertyCode]);

    // Set ticket total based on filtered results
    useEffect(() => {
        setMyPgTicketsTotal(myFilteredTickets.length);
        setCurrentPage(1); // reset to page 1 whenever filtered tickets change
    }, [myFilteredTickets]);

    const totalPages = Math.ceil(myFilteredTickets.length / TICKETS_PER_PAGE);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * TICKETS_PER_PAGE;
        return myFilteredTickets.slice(start, start + TICKETS_PER_PAGE);
    }, [myFilteredTickets, currentPage]);

    const editTicket = (ticket) => {
        // setSelectedTicket(ticket);
        // setCurrentView("edit");
        setViewTicket(ticket)
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
    ];

    const headers = useMemo(() => {
        return decryptedUser?.role === "client" ? clientHeaders : fullHeaders;
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
                    <tbody className="bg-white divide-y text-[15px] divide-gray-200">
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
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-orange-400 text-white rounded disabled:opacity-50"
                >
                    <i className="fa-solid fa-arrow-left"></i> Previous
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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


            {/* popup model for View  */}
            {/* Ticket View Modal */}
            {viewTicket && (
                <div
                    onClick={() => setViewTicket(null)}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white w-full max-w-5xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setViewTicket(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                            aria-label="Close Modal"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-3xl font-semibold mb-6 border-b pb-3">Ticket Details</h2>

                        {/* Grid for most fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-sm text-gray-800">
                            {headers.map(({ label, key }) => {
                                if (key === "WorkLogs") return null; // Skip here, handle separately below

                                const rawValue = viewTicket[key];
                                let displayValue = rawValue || "N/A";

                                if (key === "Attachment" && rawValue) {
                                    const imageUrls = rawValue.split(",").map((url) => url.trim());
                                    displayValue = (
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {imageUrls.map((url, idx) => (
                                                <img
                                                    key={idx}
                                                    src={url}
                                                    alt={`Attachment ${idx + 1}`}
                                                    className="w-20 h-20 object-cover border rounded-md hover:ring-2 hover:ring-blue-400 transition"
                                                />
                                            ))}
                                        </div>
                                    );
                                } else if (
                                    ["DateCreated", "UpdatedDateTime", "ClosedDate"].includes(key)
                                ) {
                                    displayValue = formatDate(rawValue);
                                } else if (key === "InternalComments") {
                                    displayValue = (
                                        <pre className="bg-[#F8F9FB] border border-gray-200 rounded p-2 overflow-x-auto max-h-40">
                                            {rawValue || "N/A"}
                                        </pre>
                                    );
                                }

                                return (
                                    <div key={key} className=" rounded-xl border border-orange-300 p-3">
                                        <div className="font-bold text-black text-xl ">{label}</div>
                                        <div className="text-gray-800">{displayValue}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Full-width WorkLogs at the bottom */}
                        {viewTicket.WorkLogs && (
                            <div className="mt-8">
                                <div className="font-semibold text-gray-600 mb-2 text-lg">WorkLogs</div>
                                <div className="bg-[#F8F9FB] border border-gray-300 rounded p-4 max-h-[300px] overflow-y-auto text-sm whitespace-pre-wrap">
                                    {viewTicket.WorkLogs}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}





        </div>
    );
};