import { notificationModel } from "../models/notification.js"
import { postNotificationValidator, updateNotificationValidator } from "../validators/notification.js";

export const addNotification = async (req, res, next) => {
    try {
        const { error, value } = postNotificationValidator.validate
           ({
               ...req.body,
               icon: req.file?.filename
           });
        if (error) {
            return res.status(422).json(error);
        }
         const notification = await notificationModel.create(value);
         //respond to request
        res.status(201).json(`${notification} sent!`)
    } catch (error) {
        next(error);
    }
}

export const countNotification = async ()=>{
    try {
        const {filter = "{}"} = req.query;
        //count all notification in the db
        const count = await notificationModel.countDocuments(JSON.parse(filter))
        //respond to request
        res.json({count})
    } catch (error) {
        next(error);
    }
}

// Nodemailer setup for email notifications
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

export const getNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await notificationModel.findById(id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        // Here you can add logic to send the notification, e.g., push notification or email
        res.status(200).json({ message: `Notification with ID ${id} sent successfully.` });
    } catch (error) {
        next(error);
    }
};

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationModel.find();
        // Add logic to send each notification, e.g., a loop to push each notification
        res.status(200).json({ message: "All notifications sent successfully." });
    } catch (error) {
        next(error);
    }
};

// // Update a notification by ID
// export const updateNotification = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { error, value } = updateNotificationValidator.validate(req.body);
//         if (error) {
//             return res.status(422).json({ error: error.details[0].message });
//         }
//         const updatedNotification = await notificationModel.findByIdAndUpdate(id, value, { new: true });
//         if (!updatedNotification) {
//             return res.status(404).json({ error: "Notification not found" });
//         }
//         res.status(200).json({ message: `Notification with ID ${id} updated successfully.`, data: updatedNotification });
//     } catch (error) {
//         next(error);
//     }
// };


// Delete a notification by ID
export const deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedNotification = await notificationModel.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: `Notification with ID ${id} deleted successfully.` });
    } catch (error) {
        next(error);
    }
};