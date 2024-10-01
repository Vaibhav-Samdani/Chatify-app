const messageModel = require("../model/messageModel");

const addMessage = async (req, res, next) => {
  try {
    const {from , to, message} = req.body;
    const data = await messageModel.create({
      message : {text : message},
      users : [from, to],
      sender : from,
    })
    if(data){return res.json({msg: "Message addedd successfully."})}
    return res.json({msg:"Failed to add message to database!"})
  } catch (error) {
    next(error)
  }
};

const getMessages = async (req, res, next) => {
  try {
    const {from,to} = req.body;
    const messages = await messageModel.find({
      users:{
        $all:[from,to]
      },
    }).sort({createdAt : 1});
    // console.log(messages);
    
    // const projectMessages = messages.map((msg)=>{
    //   return {
    //     fromSelf : msg.sender.toString === from,
    //     message : msg.message.text,
    //     createdAt : msg.createdAt,
    //   }
    // })
    res.json(messages)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  addMessage,
  getMessages,
};
