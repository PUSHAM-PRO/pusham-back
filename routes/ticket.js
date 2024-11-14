import { Router } from "express";
import {
  addTicket,
  completeTicket,
  countTickets,
  deleteTicket,
  getticket,
  getTicketCounts,
  getTickets,
  progressTicket,
  updateTicket,
} from "../controllers/ticket.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { ticketUpload } from "../middlewares/upload.js";

const ticketRouter = Router();

// Define routes
ticketRouter.get("/tickets/count", isAuthenticated, countTickets);
ticketRouter.post("/tickets", isAuthenticated, ticketUpload.single('photo'), addTicket);
ticketRouter.get("/tickets", isAuthenticated, getTickets);
ticketRouter.get("/tickets/:id", isAuthenticated, getticket);
ticketRouter.patch("/tickets/:id", isAuthenticated, updateTicket);
ticketRouter.delete("/tickets/:id", isAuthenticated, deleteTicket);
ticketRouter.patch("/tickets/pro/:id", isAuthenticated, progressTicket);
ticketRouter.patch("/tickets/com/:id", isAuthenticated, completeTicket);
ticketRouter.get('/tickets-stats', isAuthenticated, getTicketCounts);

export default ticketRouter;
