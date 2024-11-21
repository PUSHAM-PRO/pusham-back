import { TicketModel } from "../models/ticket.js";
import { UserModel } from "../models/usermodels.js";
import {
  addTicketValidator,
  updateTicketValidator,
} from "../validators/ticket.js";
import { mailTransporter } from "../utils/mail.js";
import { generateEmailTemplate } from "../utils/templates.js";

export const addTicket = async (req, res, next) => {
  try {
    const { error, value } = addTicketValidator.validate({
      ...req.body,
      photo: req.file?.filename
    });
    if (error) {
      return res.status(422).json(error);
    }
    // write ticket to database
    const newTicket = await TicketModel.create({
      ...value,
      user: req.auth.id,
    });
    //Store time of post of ticket
    const ticketTime = new Date().toLocaleString();

    //Email content goes here
    const emailContent = `
              <p>Dear Customer</p>
              <p>Your ticket with title: ${value.problem} has been received by ${value.department} at ${ticketTime} \n You will receive an alert once the status changes.</p>
              <p style="color: #4CAF50;">Thank you for staying connected with us!</p>
            `;

    // Send a notification about the ticket creation
    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: req.auth.email,
      subject: "Ticket Raised Successful",
      html: generateEmailTemplate(emailContent)
    });

    //respond to request
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 100, skip = 0, category } = req.query;
    
    // Merge category filter if it exists
    // const userFilter = { ..., user: req.auth.id };
    if (category) {
      userFilter.category = category;
    }

    // console.log("Filter:", userFilter);  // Log the filter to see what is being sent to the database
    
    // Fetch tickets from database
    const tickets = await TicketModel
    .find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(parseInt(limit))  // Ensure limit is an integer
      .skip(parseInt(skip));   // Ensure skip is an integer
    
    // Return response
    return res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicketsByUser = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0, category } = req.query;
    
    // Fetch tickets from database
    const tickets = await TicketModel
    .find({
      ...JSON.parse(filter),
      user: req.auth.id,
      ...(category && { category }),
    })
      .sort(JSON.parse(sort))
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    // Return response
    return res.status(200).json(tickets);
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
    // validate input data
    const { error, value } = updateTicketValidator.validate({
      ...req.body,
      photo: req.file?.filename || req.body.photo,
    });

    if (error) {
      return res.status(400).json({ message: "Validation error", details: error.details });
    }
    // check if there is user in the User model
    const assignedUser = await UserModel.findById(value.assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user not found" });
    }

    const updateTicket = await TicketModel.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      { ...value },
      { new: true }
    );

    if (!updateTicket) {
      return res.status(404).json("Update wasn't successful");
    }

    const ticketTime = new Date().toLocaleString();

    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: req.auth.email,
      subject: "Ticket Update Successful",
      text: `You have successfully updated your ticket with title: "${value.problem}" and it has been received by ${value.department} at ${ticketTime}. \nYou will receive an alert once an agent attends to it or once the status changes.`,
    });

    res.status(200).json("Ticket updated");
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    const deletedTicket = await TicketModel.findOneAndDelete(req.body.id);

    // Check if the ticket was found and deleted
    if (!deletedTicket) {
      return res.status(404).json("Ticket not found.");
    }

    // Get the current time of deletion
    const deletionTime = new Date().toLocaleString();

    // Send a notification email about the ticket deletion
    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: req.auth.email, 
      subject: "Ticket Deletion Notification",
      text: `Your ticket titled "${deletedTicket.problem}" has been deleted successfully on ${deletionTime}. If you did not perform this action, please contact support.`,
    });

    // Respond with a success message
    res.json("Ticket deleted and notification sent.");
  } catch (error) {
    next(error);
  }
};

// updating ticket status to in_progress
export const progressTicket = async (req, res, next) => {
  try {
    const state = await TicketModel.findById(req.params.id);
    // Check if the ticket exists and if its status is "initialized"
    if (!state || state.status !== "initialized") {
      console.log(state);
      return res.status(400).json("Invalid ticket status");
    }
    // Update the ticket status to "in_progress"
    state.status = "in_progress";
    await state.save();
    // Check if user email is available
    if (!req.auth.email) {
      return res.status(400).json("User email not found");
    }
    // Send a notification email about the ticket status update
    await mailTransporter.sendMail({
      to: req.auth.email,
      subject: "Ticket Status Update",
      text: `Your ticket titled "${state.problem}" has been updated to "in_progress".`,
    });

    return res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

export const completeTicket = async (req, res, next) => {
  try {
    const state = await TicketModel.findById(req.params.id);
    if (!state || state.status !== "in_progress") {
      return res.status(400).json("Invalid tickets status");
    }
    state.status = "completed";
    await state.save();

    // Check if user email is available
    if (!req.auth.email) {
      return res.status(400).json("User email not found");
    }
    // Send a notification email about the ticket deletion
    await mailTransporter.sendMail({
      to: req.auth.email,
      subject: "Ticket Status Notification",
      text: `${state.problem} has been addressed. `,
    });
    return res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

export const getTicketCounts = async (req, res, next) => {
  try {
    // Count total tickets
    const totalTickets = await TicketModel.countDocuments();

    // Count tickets that are in progress
    const inProgressTickets = await TicketModel.countDocuments({ status: 'in progress' });

    // Count tickets that are completed
    const completedTickets = await TicketModel.countDocuments({ status: 'completed' });

    // Return counts to the client
    res.status(200).json({
      totalTickets,
      inProgressTickets,
      completedTickets
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketCountsUser = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const userFilter = { ...JSON.parse(filter), user: req.auth.id };
    // Count total tickets
    const totalTickets = await TicketModel.countDocuments(userFilter);

    // Count tickets that are in progress
    const inProgressTickets = await TicketModel.countDocuments({ ...userFilter, status: 'in progress' });

    // Count tickets that are completed
    const completedTickets = await TicketModel.countDocuments({ ...userFilter, status: 'completed' });

    // Return counts to the client
    res.status(200).json({
      totalTickets,
      inProgressTickets,
      completedTickets
    });
  } catch (error) {
    next(error);
  }
};

