import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "stmp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: "byourself@gmail.com",
        pass: process.env.SMTP_PASSWORD
    },
  from: "byourself@gmail.com"
});