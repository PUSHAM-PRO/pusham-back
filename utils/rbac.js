export const permissions = [
    {
        role: 'customer',
        actions: ['post_ticket',
            'get_ticket',
            'get_tickets',
            'update_ticket'
        ]
    },
    {
        role: 'agent',
        actions: [
            'get_ticket',
            'get_tickets',
            'get_customers',
            'get_customer',
            'get_agent',
            'get_agents',
            'escalate_ticket',
            'close_ticket',
        ]
    },

    {
        role: 'department',
        actions: ['assign_agent',
            'get_ticket',
            'get_tickets',
            'get_customers',
            'get_customer',
            'get_agent',
            'get_agents',
            'get_departments',
            'get_department',
            'send_power_outage_notification'
        ]
    },
    {
        role: 'superadmin',
        actions: ['message_agent',
            'message_customer',// not quite sure of the messaging but im thinking it would be linked to a post method for message/chat
            'message_agents',
            'message_customers',
            'message_department',
            'message_departments',
            'add_department',
            'delete_department',
            'update_department',
            'add_agent',
            'update_agent',
            'delete_agent',
            'get_tickets',
            'get_ticket',
            'assign_ticket',
            'reassign_ticket',
            'assign_department',
            'reassign_department',
            'get_customer',
            'get_customers',
            'get_agent',
            'get_agents',
            'get_departments',
            'get_department',
            'post_power_outage_notification'
        ]
    }
];
