//   import React, { useContext, useMemo } from 'react';   

import React, { useState, useContext, useMemo, createContext, useEffect } from 'react';
import { usePropertyData, useTicketSheetData, useUpdateTicketSheetData } from './Services';
import { useLocation } from 'react-router-dom';

// ✅ Export the context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

 const location = useLocation();

  const isTicketsPage = location.pathname === '/gpgs-actions/tickets';

  const { data, isLoading, error } = useTicketSheetData(isTicketsPage); 
    const { mutate: updateTicketData, isLoading: isticketUpdate } = useUpdateTicketSheetData();

// Start with an empty array
const [tickets, setTickets] = useState([]);

useEffect(() => {
  if (Array.isArray(data?.data)) {
    setTickets([...data.data]);
  }
}, [data]); // Runs whenever `data` changes


    const initialUsers = [
        { id: 1, name: 'John Doe', role: 'Admin', email: 'john@company.com', department: 'IT' },
        { id: 2, name: 'Alice Smith', role: 'Manager', email: 'alice@company.com', department: 'IT' },
        { id: 3, name: 'Bob Johnson', role: 'Leader', email: 'bob@company.com', department: 'IT' },
        { id: 4, name: 'Charlie Brown', role: 'Member', email: 'charlie@company.com', department: 'IT' },
        { id: 5, name: 'Jane Smith', role: 'Member', email: 'jane@company.com', department: 'HR' },
        { id: 6, name: 'Mike Wilson', role: 'Manager', email: 'mike@company.com', department: 'Finance' },
        { id: 7, name: 'Sarah Davis', role: 'Leader', email: 'sarah@company.com', department: 'Marketing' },
        { id: 8, name: 'Tom Anderson', role: 'Member', email: 'tom@company.com', department: 'Operations' }
    ];
    
    const [users, setUsers] = useState(initialUsers);
    const [currentUser, setCurrentUser] = useState(initialUsers[0]);
    const [currentView, setCurrentView] = useState('dashboard');
    const [modal, setModal] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        Status: '',
        Priority: '',
        Department: '',
        Assignee: ''
    });

    const addTicket = (ticket) => {
        const newTicket = {
            ...ticket,
            id: `TKT-2025-${String(tickets.length + 1).padStart(4, '0')}`,
            createdDate: new Date().toISOString().split('T')[0],
            createdBy: currentUser.name,
            workLogs: [
                { id: 1, message: 'Ticket created', user: currentUser.name, timestamp: new Date().toISOString(), type: 'created' }
            ],
            attachments: []
        };
        setTickets([...tickets, newTicket]);
    };

const updateTicket = (ticketId, updates) => {

    // Step 1: Find the ticket to update
    const ticketToUpdate = tickets?.find(ticket => ticket.TicketID === ticketId);

    if (!ticketToUpdate) {
        console.error(`❌ Ticket with ID ${ticketId} not found.`);
        return;
    }

    // Step 2: Merge updates into the found ticket
    const updatedTicket = { ...ticketToUpdate, ...updates };


    // Step 3: Send only the updated ticket
    updateTicketData(updatedTicket, {
        onSuccess: () => {
            alert("✅ Ticket successfully updated in Google Sheet!");
        },
        onError: (error) => {
            console.error("❌ Failed to update ticket:", error);
        },
    });

    return updatedTicket;
};



    const deleteTicket = (ticketId) => {
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    };

    const addWorkLog = (ticketId, message) => {
        setTickets(tickets.map(ticket =>
            ticket.id === ticketId
                ? {
                    ...ticket,
                    workLogs: [
                        ...ticket.workLogs,
                        {
                            id: ticket.workLogs.length + 1,
                            message,
                            user: currentUser.name,
                            timestamp: new Date().toISOString(),
                            type: 'worklog'
                        }
                    ]
                }
                : ticket
        ));
    };

    const addUser = (user) => {
        const newUser = {
            ...user,
            id: users.length + 1
        };
        setUsers([...users, newUser]);
    };

    const updateUser = (userId, updates) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, ...updates } : user
        ));
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const matchesSearch = ticket.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = !filters.Status || ticket.Status === filters.Status;
            const matchesPriority = !filters.Priority || ticket.Priority === filters.Priority;
            const matchesDepartment = !filters.Department || ticket.Department === filters.Department;
            const matchesAssignee = !filters.Assignee || ticket.Assignee === filters.Assignee;
            const matchesManager = !filters.Manager || ticket.Manager === filters.Manager;

            return matchesSearch && matchesStatus && matchesPriority && matchesDepartment && matchesAssignee && matchesManager ;
        });
    }, [tickets, searchTerm, filters]);

    const value = {
        tickets,
        users,
        currentUser,
        setCurrentUser,
        currentView,
        setCurrentView,
        selectedTicket,
        setSelectedTicket,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        filteredTickets,
        addTicket,
        updateTicket,
        deleteTicket,
        addWorkLog,
        addUser,
        updateUser,
        deleteUser,
        setModal,
        modal
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
