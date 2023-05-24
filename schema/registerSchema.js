const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const registerData = mongoose.model("register", registerSchema);

module.exports = registerData;
