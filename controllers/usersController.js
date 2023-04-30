const {
  registration,
  login,
  logout,
  currentUser,
} = require("../service/usersService.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function registrationController(req, res, next) {
  const { email, password } = req.body;
  await registration(email, password);
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
}

async function loginController(req, res, next) {
  const { email } = req.body;
  const user = await login(email);

  const data = {
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };

  res.status(200).json({ data });
}

async function logoutController(req, res, next) {
  const [tokenType, token] = req.headers.authorization.split(" ");
  const user = jwt.decode(token, process.env.JWT_SECRET);
  await logout(user._id);

  res.status(204).end();
}

async function currentUserController(req, res, next) {
  const id = req.user._id;
  const data = await currentUser(id);
  const { email, subscription } = data[0];

  res.status(200).json({ email, subscription });
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
};
