export const permissions = [
    {
        role: 'customer',
        actions: [
            "addTickets",
            "getTicket",
            "getTicketsByUser",
            "countUserTickets",
            "deleteTicket"
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
            "deleteTicket",
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
            "deleteTicket",
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
