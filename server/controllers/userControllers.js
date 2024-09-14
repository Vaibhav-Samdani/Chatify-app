const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });

    if (usernameCheck) {
      return res.json({ msg: "Username already exists", status: false });
    }

    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    delete user.password;
    
    userData = {
      ...user._doc,
      password: undefined,
    };
    console.log(userData);
    
    return res.json({ status: true, userData });
  } catch (error) {
    next(error);
  }
};


const getAllUsers = async (req,res,next)=>{
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
}



module.exports = { register, login,getAllUsers };
