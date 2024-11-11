import { NotificationModel } from "../models/notification.js";
import notificationValidator from "../validators/notification.js";
import { UserModel } from "../models/usermodels.js";

//Role: department and superAdmins to all users
export const sendNotification = async (req, res, next) =>{
try {
    //validate user input or the request
    const {error, value} = notificationValidator.validate(req.body);
    if (error){
        return res.status(422).json(error);
    }
    //Save notification to the database
    const notify = await NotificationModel.create({ value});
    // Retrieve all users' emails from the database
    const users = await UserModel.find({}, 'email');

    //OR
    // Retrieve emails of users with the role of 'customer'
    //const customers = await UserModel.find({ role: 'customer' }, 'email');


    // Send a notification email to each user
    const sendNotifications = users.map(async (user) => {
        return mailTransporter.sendMail({
            to: user.email,
            subject: value.title,
            text: value.message
        });
    });

    // Wait for all notifications to be sent
    await Promise.all(sendNotifications);
    // Response to the request
    res.status(201).json({ message: 'Notification sent to all users', notification: notify });

} catch (error) {
    next(error);
}
}
