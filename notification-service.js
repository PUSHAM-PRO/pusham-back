import nodemailer from 'nodemailer';

// Set up your email transporter (use environment variables for sensitive data)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email notification to the user.
 * @param {String} to - Recipient's email address.
 * @param {String} subject - Subject of the email.
 * @param {String} text - Body of the email.
 */
export async function sendNotification(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent to ${to}`);
    } catch (error) {
        console.error(`Error sending notification: ${error.message}`);
    }
}
