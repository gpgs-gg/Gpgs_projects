import { useApp } from "./AppProvider";
import { TicketFilters } from "./TicketFilters";

export const TicketList = () => {
    const {
        filteredTickets,
        setCurrentView,
        setSelectedTicket,
        deleteTicket,
        setModal
    } = useApp();

<<<<<<< HEAD


=======
>>>>>>> 11052d92bcf368c39bf919f947dccb6b158d015f
    const editTicket = (ticket) => {
        setSelectedTicket(ticket);
        setCurrentView("edit");
    };
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";

        // Assuming dateString is in "dd/MM/yyyy, HH:mm:ss" or similar format
        const [datePart, timePart] = dateString.split(",").map((str) => str.trim());
        const [day, month, year] = datePart.split("/");
        const [hour = "00", minute = "00", second = "00"] = (timePart || "").split(":");
        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

        const date = new Date(isoString);
        console.log("Parsed date:", date);
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

    // Header labels mapping to actual ticket object keys
    const headers = [
        { label: "TicketID", key: "TicketID" },
        { label: "Date Created", key: "DateCreated" },
        { label: "Property Code", key: "PropertyCode" },
        { label: "Title", key: "Title" },
        { label: "Attachment", key: "Attachment" },
        { label: "Customer Impacted", key: "CustomerImpacted" },
        { label: "Escalated", key: "Escalated" },
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">All Tickets</h2>
                    <p className="text-gray-600">{filteredTickets.length} tickets found</p>
                </div>

                <button
                    onClick={() => setCurrentView("create")}
                    className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
                >
                    <i className="fas fa-plus"></i>
                    <span>Create Ticket</span>
                </button>
            </div>

            <TicketFilters />

            <div className="bg-white rounded-lg shadow overflow-auto">
                <table className="min-w-full  divide-gray-200 text-sm">
                    <thead className="bg-orange-300">
                        <tr>
                            {headers.map(({ label, key }) => (
                                <th
                                    key={label}
                                    className={`px-6 py-3 text-left font-bold text-black text-lg whitespace-nowrap overflow-hidden  max-w-[200px] ${key === "TicketID" ? "sticky left-0 z-20 bg-orange-300" : ""
                                        }`}
                                    title={label} // Tooltip on hover
                                >
                                    {label}
                                </th>
                            ))}
                            <th
                                className="px-6 py-3 text-left text-black font-bold text-lg sticky right-0 bg-orange-300 z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]" title="Actions">
                                Actions
                            </th>
                        </tr>

                    </thead>
                    <tbody className="bg-white divide-y text-[15px] divide-gray-200">
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.TicketID} className="hover:bg-gray-50 border">
                                {headers.map(({ key }) => (
                                    <td
                                        key={key}
                                        className={`px-4 py-3 whitespace-nowrap  text-gray-900 max-w-[200px] ${key === "TicketID" ? "sticky left-0 bg-white z-10" : ""
                                            }`}
                                        title={typeof ticket[key] === "string" ? ticket[key] : ""}
                                    >
                                        {key === "Title" ? (
                                            <div>
                                                <div className="font-medium">{ticket.Title || "N/A"}</div>
                                                <div className="text-xs text-gray-500 break-words max-w-[300px] whitespace-nowrap overflow-hidden   text-ellipsis">
                                                    {ticket.Description
                                                        ? `${ticket.Description.substring(0, 60)}...`
                                                        : "No Description"}
                                                </div>
                                            </div>
                                        ) : key === "Attachment" ? (
                                            <div className="flex gap-2 ">
                                                {(() => {
                                                    let attachments = [];

                                                    try {
                                                        attachments =
                                                            typeof ticket.Attachment === "string"
                                                                ? JSON.parse(ticket.Attachment)
                                                                : ticket.Attachment;

                                                        if (!Array.isArray(attachments)) throw new Error("Not an array");
                                                    } catch (err) {
                                                        if (typeof ticket.Attachment === "string") {
                                                            attachments = ticket.Attachment
                                                                .split(",")
                                                                .map((name) => ({
                                                                    name: name.trim(),
                                                                    url: null,
                                                                    type: null,
                                                                }));
                                                        } else {
                                                            attachments = [];
                                                        }
                                                    }

                                                    return attachments.map((file, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-14 h-14 relative rounded overflow-hidden border bg-gray-50 text-center text-[10px] flex items-center justify-center"
                                                            title={file.name}
                                                        >
                                                            {file.url && file.type?.startsWith("image/") ? (
                                                                <img
                                                                    src={file.url.toString()}
                                                                    alt={file.name}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            ) : file.url && file.type?.startsWith("video/") ? (
                                                                <video
                                                                    src={file.url}
                                                                    className="object-cover w-full h-full"
                                                                    muted
                                                                />
                                                            ) : (
                                                                <span className="p-1 truncate">{file.name}</span>
                                                            )}
                                                        </div>
                                                    ));
                                                })()}
                                            </div>
                                        ) : key === "DateCreated"
                                            // key === "ClosedDate" ||
                                            // key === "UpdatedDateTime"
                                            ? (
                                                formatDate(ticket[key])

                                            ) : key === "WorkLogs" ? (
                                                <div className="text-xs text-gray-700 whitespace-pre-wrap break-words max-w-[1000px]">
                                                    {`${ticket.WorkLogs.substring(0, 28)}` || "No WorkLogs"}
                                                </div>
                                            ) : (
                                                ticket[key] || "N/A"
                                            )

                                        }

                                    </td>
                                ))}

                                <td className="px-5 py-7 h-full flex gap-3 whitespace-nowrap text-lg font-medium sticky right-0 bg-white z-10">

                                    <button
                                        onClick={() => editTicket(ticket)}
                                        className="text-red-600 hover:text-red-900"
                                        title="View"
                                    >
                                        <i className="fa fa-eye"></i>
                                    </button>

                                    <button
                                        onClick={() => editTicket(ticket)}
                                        className="text-green-600 hover:text-green-900 mr-3"
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};
