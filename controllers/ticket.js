import { TicketModel } from "../models/ticket.js";
import {addTicketValidator,updateTicketValidator,} from "../validators/ticket.js";
import { mailTransporter } from "../utils/mail.js";

export const addTicket = async (req, res, next) => {
  try {
    const { error, value } = addTicketValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // write ticket to database
    const newTicket = await TicketModel.create({
      ...value,
      user: req.auth.id,
    });

    // Store the time of profile update
    // const ticketTime = new Date().toLocaleString();

    const userEmail = req.auth.email; // Assume req.auth contains email as well
    if (!userEmail) {
      res.status(404).json("User email not found.");
    }

    // Send a notification about the ticket creation
    await mailTransporter.sendMail({
      to: userEmail,
      subject: "User registration",
      text: `Hello`,
    });

    //respond to request
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
    const userFilter = { ...JSON.parse(filter), user: req.auth.id };
    // Fetch tickets from database
    const tickets = await TicketModel.find(userFilter)
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    // Return response
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const countTickets = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const userFilter = { ...JSON.parse(filter), user: req.auth.id };
    // count tickets in database
    const count = await TicketModel.countDocuments(userFilter);
    //respond to request
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

export const getticket = async (req, res, next) => {
  try {
    //get ticket by id from database
    const ticket = await TicketModel.findById(req.params.id);
    //respond  to request
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const { error, value } = updateTicketValidator.validate(req.body);
    if (error) {
      return res.status(404).json("No data to update");
    }
    const updatedTicket = await TicketModel.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      { ...req.body },
      { new: true }
    );
    if (!updatedTicket) {
      res.status(404).json("Update wasn't successful");
    }

    await mailTransporter.sendMail({
      to: value.email,
      subject: "Update Ticket",
      text: `Hello ${value.name}, you have updated your PUSHAM ticket successfully, \nHere are your details,\n ${JSON.stringify(
        value,
        null,
        2
      )}`,
    });
    res.status(200).json("Ticket updated");
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    // delete a ticket from database
    const deleteTickets = await TicketModel.deleteOne(req.body.id);
    res.json("Ticket deleted");
  } catch (error) {
    next(error);
  }
};

// updating ticket status to in_progress

export const progressTicket = async (req, res, next) => {
  try {
    const state = await TicketModel.findById(req.params.id);
    if (!state || state.status !== "initialized") {
      res.status(400).json("Invalid tickets status");
    }
    state.status = "in_progress";
    await state.save();
    return res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

export const completeTicket = async (req, res, next) => {
  try {
    const state = await TicketModel.findById(req.params.id);
    if (!state || state.status !== "in_progress") {
      res.status(400).json("Invalid tickets status");
    }
    state.status = "completed";
    await state.save();
    return res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};
