import nodemailer from "nodemailer";

const sendEmail = async (to, subject, mailBody) => {
  try {
    console.log("Sending email to ", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSCODE,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: mailBody, // Use 'html' instead of 'mailBody' for HTML content
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendEmail;
