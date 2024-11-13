import { NotificationModel } from "../models/notification.js";
import notificationValidator from "../validators/notification.js";
import { UserModel } from "../models/usermodels.js";
import { mailTransporter } from "../utils/mail.js";
import { generateEmailTemplate } from "../utils/templates.js";


//Role: department and superAdmins to all users
export const sendNotification = async (req, res, next) => {
    try {
        //validate user input or the request
        const { error, value } = notificationValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details });
        }
        //Save notification to the database
        const notify = await NotificationModel.create(value);
        // Retrieve all users' emails from the database
        // const users = await UserModel.find({}, 'email');

        //Retrive emails of customers with the location passed in the value or req body.
        const { location } = req.body

        // Retrieve emails of users with the role of 'customer'
        const customers = await UserModel.find({ role: 'customer', location }, 'name email');

        // Send a personalized notification email to each user
        const sendNotifications = customers.map(async (customer) => {
            const emailContent = `
              <p>Dear ${customer.name},</p>
              <p>${notify.message}</p>
              <p style="color: #4CAF50;">Thank you for staying connected with us!</p>
            `;

            return mailTransporter.sendMail({
                from: 'PUSHAM <byourself77by@gmail.com>',
                to: customer.email,
                subject: notify.title,
                html: generateEmailTemplate(emailContent)
            });
        });

        // Wait for all notifications to be sent
        await Promise.all(sendNotifications);
        // Response to the request
        res.status(201).json({ message: `Notification sent to customers in ${location}`, notification: notify });

    } catch (error) {
        next(error);
    }
}
