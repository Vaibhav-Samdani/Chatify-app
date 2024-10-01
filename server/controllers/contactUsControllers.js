const saveToExcel = require("../utils/excelSave");
const sendMail = require("../utils/sendEmail");
require("dotenv").config()

const contactUs = (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);
  saveToExcel(name, email, message);
  sendMail(
    email,
    "Your Response",
    "Thanks for Contacting Us – We’ll Get Back to You Soon!",
    name,
    email,
    message
  );

  sendMail(
    process.env.ADMIN_MAIL,
    "New Message Received",
    "New Person contacted you!",
    name,
    email,
    message
  );

  return res.json({ msg: "Your message has been sent!\nThank you for contacting!😊", status: true });
};

module.exports = contactUs;
