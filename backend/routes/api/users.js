const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = require("../../users");

const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser
    .save()
    .then((user) => {
      user.hash_password = undefined;
      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Username already in use",
      });
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }
      //   create JWT token
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        "RESTFULAPIs"
      );
      //   return success res
      res.status(200).send({
        message: "Login Successful",
        username: user.username,
        token,
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "User not found",
        e,
      });
    });
});

// exports.loginRequired = function (req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     return res.status(401).json({ message: "Unauthorized user!!" });
//   }
// };
// exports.profile = function (req, res, next) {
//   if (req.user) {
//     res.send(req.user);
//     next();
//   } else {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

module.exports = router;
