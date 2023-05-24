const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

//const import databse
const passwordData = require("./schema/passwordSchema.js");
const registerData = require("./schema/registerSchema.js");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    console.log("connection to the database succesfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3004" }));

app.post("/test", async (req, res) => {
  try {
    const { username, password, website } = req.body.formDeatils;
    const passwords = passwordData.create({ username, password, website });
    console.log(passwords);
    res.send("requeist recived succesfully");
  } catch (err) {
    console.log(err.message);
    res.status(409).send({ error: "somethin went wrong in server" });
  }
});

app.post("/getdata", async (req, res) => {
  try {
    const passwords = await passwordData.find({});
    console.log(passwords);
    res.send(passwords);
  } catch (err) {
    console.log(err.message);
    res.status(409).send({ error: "somethin went wrong in server" });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const { data } = req.body;
    const passwords = await passwordData.findOneAndDelete({ website: data });
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    const registerinfo = await registerData.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(200).send("succesfull");
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const registerinfo = await registerData.findOne({ username, password });
    if (!registerinfo) {
      return res
        .status(401)
        .send({
          message: "unauthorised",
          username: registerData.username,
          password: registerData.password,
        });
    }
    res.status(200).send("succesfull");
  } catch (err) {
    console.log(err.message);
    res.status(501).send({ message: "something went wrong" });
  }
});
app.listen(1234, () => {
  console.log("listening on port 1234");
});
