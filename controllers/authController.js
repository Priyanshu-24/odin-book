require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

const bcrypt = require("bcrypt");
const passport = require("passport");

exports.signup_get = (req, res, next) => {
  res.render("signup", { user: req.user, err: null });
};

exports.login_get = (req, res, next) => {
  res.render("login", { user: req.user, msg: null });
};

exports.signup_post = async (req, res, next) => {
  const { username, password, first_name, last_name } = req.body;
  const existentUser = await User.findOne({ username });

  if (existentUser)
    res.render("signup", {
      user: req.user,
      err: "Username already present",
    });
  else {
    const hashedPassword = await bcrypt.hash(password, 10);

    // var picture = "profile/" + req.file.filename;
    // var mimeType = req.file.mimetype;
    const userResponse = await User.create({
      username,
      password: hashedPassword,
      first_name,
      last_name,
      // picture,
      // image: {
      //   data: fs.readFileSync(path.join(__dirname + '/../public/images/' + picture)),
      //   contentType: mimeType
      // },
    });

    if (!userResponse)
      res.render("signup", {
        user: req.user,
        err: "Error while Signing Up",
      });
    else {
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
      })(req, res, next);
    }
  }
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
