const { Router } = require("express");
const { addMessage, getMessages } = require("../controllers/messageController");

const router = Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/",getMessages);

module.exports = router;