import ContactMessage from "../models/contactMessage.js";
import Job from "../models/jobModel.js";
import sendEmail from "../utils/sendEmail.js";

export const GetAllJObs = async (req, res, next) => {
  try {
    const Jobs = await Job.find();

    res.status(200).json({ message: "All Jobs Fetched", data: Jobs });
  } catch (error) {
    next(error);
  }
};

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message || !subject) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
      subject,
    });

    //construct an email body
    const emailBody = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send notification emails to admins
    let emailSent = false;

    if (process.env.ADMIN_EMAILS) {
      const adminEmails = process.env.ADMIN_EMAILS.split(",").map((email) =>
        email.trim()
      );

      // Send emails to each admin individually
      // for (const adminEmail of adminEmails) {
      //   const result = await sendEmail(adminEmail, `New Contact Form: ${subject}`, emailBody);
      //   if (result) {
      //     emailSent = true;
      //   }
      // }

      adminEmails.forEach(async (element) => {
        const result = await sendEmail(
          element,
          `New Contact Form: ${subject}`,
          emailBody
        );
        if (result) {
          emailSent = true;
        }
      });
    }

    res.status(200).json({
      message: "Contact form submitted successfully",
      emailSent: emailSent,
    });
  } catch (error) {
    next(error);
  }
};
