import { Router } from "express";
import {
  addTicket,
  completeTicket,
  countTickets,
  deleteTicket,
  getticket,
  getTicketCounts,
  getTicketCountsUser,
  getTickets,
  getTicketsByUser,
  progressTicket,
  updateTicket,
} from "../controllers/ticket.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { ticketUpload } from "../middlewares/upload.js";
import { addCategory } from "../controllers/addDepartment.js";

const ticketRouter = Router();

// Define routes
ticketRouter.post("/tickets", isAuthenticated, hasPermission("addTickets"), ticketUpload.single('photo'), addTicket);
ticketRouter.get("/tickets", isAuthenticated, hasPermission("getAllTickets"), getTickets);
ticketRouter.get("/tickets/byUser", isAuthenticated, hasPermission("getTicketsByUser"), getTicketsByUser);
ticketRouter.get("/tickets/:id", isAuthenticated, hasPermission("getTicket"), getticket);
ticketRouter.patch("/tickets/:id", isAuthenticated,hasPermission("updateTickets"), ticketUpload.single('photo'), updateTicket);
ticketRouter.delete("/tickets/:id", isAuthenticated, hasPermission("deleteTickets"), deleteTicket);
ticketRouter.patch("/tickets/pro/:id", isAuthenticated,hasPermission("in_progress"), progressTicket);
ticketRouter.patch("/tickets/com/:id", isAuthenticated, hasPermission("completed"), completeTicket);
ticketRouter.get('/tickets-stats', isAuthenticated,hasPermission("countTickets"), getTicketCounts);
ticketRouter.get('/tickets-stats/user', isAuthenticated,hasPermission("countUserTickets"), getTicketCountsUser);
ticketRouter.post('/addCategory', isAuthenticated,hasPermission("addDepartment"), addCategory);

export default ticketRouter;
