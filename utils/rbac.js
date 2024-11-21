export const permissions = [
    {
        role: 'customer',
        actions: [
            "addTickets",
            "getTicket",
            "getTicketsByUser",
            "countUserTickets",
            "deleteTickets"
        ]
    },
    {
        role: 'agent',
        actions: [
            "addTickets",
            "getTicket",
            "getTicketsByUser",
            "getAllTickets",
            "countUserTickets"
        ]
    },

    {
        role: 'department',
        actions: [
            "addTickets",
            "getTicket",
            "getAllTickets",
            "deleteTickets",
            "getTicketsByUser",
            "getAllTickets",
            "countUserTickets"
        ]
    },
    {
        role: 'superadmin',
        actions: [
            "addTickets",
            "getTicket",
            "getAllTickets",
            "getTicketsByUser",
            "deleteTickets",
            "signupUser",
            "countTickets",
            "ticketsInProgress",
            "createDepartment",
            "ShareTickets",
            "updateTickets",
            "in_progress",
            "completed",
            "countUserTickets",
            "addDepartment",
        ]
    }
];
