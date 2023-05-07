const User = require("./schemas/authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
require("dotenv").config();

const registration = async (email, password) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email),
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
  await User.findByIdAndUpdate(id, { $unset: { token: 1 } });
};

const currentUser = async (id) => {
  const user = await User.find({ _id: id });
  return user;
};

const updateAvatar = async (id, url) => {
  await User.findByIdAndUpdate(id, { avatarURL: url });
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateAvatar,
};
