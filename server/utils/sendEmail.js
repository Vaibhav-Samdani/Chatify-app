const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config({ path: "../" });

const sendMail = (receiver_email, title ,subject, name, email, message) => {
  console.log("Mail Sending");
  const sender_email = process.env.SENDER_MAIL;
  const password = process.env.PASSWORD;

  const templatePath = path.join(__dirname, "./Files/contactTemplate.html");

  // Read the HTML template from the file
  fs.readFile(templatePath, "utf8", (err, htmlContent) => {
    if (err) {
      console.error("Error reading the HTML template:", err);
      return; 
    }

    // Replace placeholders in the HTML template, if needed (like {{name}})
    emailHtml = htmlContent
      .replace("{{name}}", name)
      .replace("{{email}}", email)
      .replace("{{message}}", message)
      .replace("{{title}}", title);

    // Create a transporter object using your email service
    const transporter = nodemailer.createTransport({
      service: "yahoo", // You can use other services like 'hotmail', 'yahoo', etc.
      auth: {
        user: sender_email,
        pass: password,
      },
    });

    // Set up email data
    const mailOptions = {
      from: sender_email,
      to: receiver_email,
      subject: subject,
      html: emailHtml, // Plain text body
      //   html: `<h1>${text}</h1>` // HTML body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred:", error);
      }
      console.log("Email sent:", info, "Info Response : ", info.response);
      console.log("Mail Send!!");
    });
  });
  
};

module.exports = sendMail;
