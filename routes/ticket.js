import { Router } from "express";
import {addTicket, countTickets, deleteTicket, getTickets, updateTicket} from "../controllers/ticket.js"
import {isAuthenticated} from "../middlewares/auth.js"

const ticketRouter = Router();

// Define routes
ticketRouter.get('/tickets/count', countTickets),
ticketRouter.post('/tickets',isAuthenticated, addTicket),
ticketRouter.get('/tickets', isAuthenticated, getTickets),
ticketRouter.get('/tickets/:id'),
ticketRouter.patch('/tickets/:id', isAuthenticated, updateTicket),
ticketRouter.delete('/tickets/:id', deleteTicket);

export default ticketRouter;