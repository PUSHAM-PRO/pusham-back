import { TicketModel } from "../models/ticket.js";
import { addTicketValidador, updateTicketValidator } from "../validators/ticket.js";

export const addTicket = async (req, res, next) => {
    try {
        const { error, value } = addTicketValidador.validate(req.body);
        if (error) {
            return res.status(422).json(error)
        }
        // write ticket to database
        await TicketModel.create(value);
        //respond to request
        res.status(201).json('Ticket created');
    } catch (error) {
        next(error)
    }
}

export const getTickets = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Fetch tickets from database
        const tickets = await TicketModel
            .find(JSON.parse(filter))
            .sort(json.parse(sort))
            .limit(limit)
            .skip(skip);
        // Return response
        res.status(200).json(tickets)
    } catch (error) {
        next(error)
    }
}

export const countTickets = async (req, res, next) => {
    try {
        const { } = req.query;
        // count tickets in database
        const count = await TicketModel.countDocuments(JSON.parse(filter));
        //respond to request 
        res.json({ count })
    } catch (error) {
        next(error);
    }
}

export const getticket = async (req, res, next) => {
    try {
        const { id } = req.params;
        //get ticket by id from database
        const ticket = await TicketModel.findById(id);
        //respond  to request
        res.json(ticket)
    } catch (error) {
        next(error);
    }
}

export const updateTicket = (req, res, next) => {
   try {
    const { } = updateTicketValidator
    res.json('Ticket updated')
     
   } catch (error) {
    next(error)
   }
}

export const deleteTicket = async (req, res, next) => {
    try {
        // delete a ticket from database
        const deleteTickets = await TicketModel.deleteOne(req.body.id)
        res.json('Ticket deleted');
    } catch (error) {
        next(error);

    }
}