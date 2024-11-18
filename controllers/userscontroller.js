import { UserModel } from "../models/usermodels.js";
import { mailTransporter } from "../utils/mail.js";
import {
  userLoginValidator,
  userSignUpValidator,
  userUpdateValidator,
} from "../validators/usersvalitor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signupEmailTemplate, loginEmailTemplate, updateEmailTemplate } from "../utils/templates.js";

export const userSignup = async (req, res, next) => {
  try {
    // checking if inputed details are correct
    const { error, value } = userSignUpValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //  check the database if the email exist already
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(409).json("user already exist");
    }
    const hashedpassword = bcrypt.hashSync(value.password, 10);
    // save to database
    await UserModel.create({
      ...value,
      password: hashedpassword,
    });

    //Content of the html for the email
    const emailContent = `
              <p>Dear ${value.name},</p>
              <p style="color: #4CAF50;">Thank you for registering with PUSHAM!</p>
            `;

    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: value.email,
      subject: "User registration",
      html: signupEmailTemplate(emailContent)
    });
    return res.status(200).json("User Registered Successfully");
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    // validate the person credentials
    const { error, value } = userLoginValidator.validate(req.body);
    if (error) {
      res.status(422).json(error);
    }
    // find user with email
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      res.status(404).json("Invalid Credentials");
    }
    // check for validity of password
    const correctpassword = bcrypt.compare(value.password, user.password);
    if (!correctpassword) {
      res.status(404).json("Invalid Credentials");
    }
    // now generate a token for the person
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "24h",
      }
    );

    //send response back to the user  with the access token
    res.json({
      message: "user logged in",
      accessToken: token,
    });
    //get current timestamp for the login
const loginTime = new Date().toLocaleString();

    //Content of the html for the email
    const emailContent = `
              <p>Dear ${user.name},</p>
              <p>We noticed you logged in at ${loginTime}.\n 
      Welcome back to Pusham \n 
      If this was not from you, kindly change your password as soon as possible or reach out to customer support</>
              <p style="color: #4CAF50;">Thank you for staying with PUSHAM!</p>
            `;

    //send a login confirmation to the user
    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: value.email,
      subject: "User Login Update ",
      html: loginEmailTemplate(emailContent)
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.auth.id).select({
      password: false,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    // Validate the user request
    const { error, value } = userUpdateValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    // Find the user ID
    const updatedVendor = await UserModel.findByIdAndUpdate(
      req.auth.id,
      value,
      { new: true }
    );   
    if (!updatedVendor) {
      return res.status(404).json({ message: "user not found" });
    }
    // Store the time of profile update
    const updateTime = new Date().toLocaleString();

    //Content of the html for the email
    const emailContent = `
              <p>Dear ${value.name},</p>
              <p>Hello ${updatedVendor.name}, your profile was successfully updated at ${updateTime}.\n 
      If this was not from you, kindly change your password as soon as possible or reach out to customer support</>
              <p style="color: #4CAF50;">Thank you for staying with PUSHAM!</p>
            `;
    
    // Send a notification about profile update
    await mailTransporter.sendMail({
      from: 'PUSHAM <byourself77by@gmail.com>',
      to: value.email,
      subject: "User Login Update ",
      html: updateEmailTemplate(emailContent)
    });
    // Send push notification if user has fcmToken
    if (updatedVendor.fcmToken) {
      const payload = {
        notification: {
          title: "Profile Update Notice",
          body: `Hello ${updatedVendor.name}, your profile was successfully updated at ${updateTime}.`,
        },
        token: updatedVendor.fcmToken,
      };
      await admin.messaging().send(payload);
    }

    //Send the updated vendor profile
    res.json("Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await UserModel.findOneAndDelete({ _id: req.auth.id });

    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the time of profile update
    const deleteTime = new Date().toLocaleString();

    // Send a notification about profile update
    await mailTransporter.sendMail({
      to: user.email,
      subject: "Delete Account",
      text: `Hello ${user.name}, you deletd your Pusham account at ${deleteTime}.`,
    });

    // Send success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
