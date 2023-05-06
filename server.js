const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const connection = require("./service/dbConnect");
const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});
