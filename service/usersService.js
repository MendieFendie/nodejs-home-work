const User = require("./schemas/authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registration = async (email, password) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });
  await user.save();
};

const login = async (email) => {
  const user = await User.findOne({ email });
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await User.findOneAndUpdate({ _id: user._id }, { token: token });

  return user;
};

const logout = async (id) => {
  User.findByIdAndUpdate({ _id: id }, { token: null });
};

const currentUser = async (id) => {
  const user = await User.find({ _id: id });
  return user;
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
};
