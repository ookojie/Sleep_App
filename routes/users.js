const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User model
const User = require("../models/User");
const { request, response } = require("express");

//Login Page
router.get("/login", (request, response, next) => {
  try {
    response.render("Login");
  } catch (error) {
    return next(error);
  }
});

//Register Page
router.get("/register", (request, response, next) => {
  try {
    response.render("Register");
  } catch (error) {
    return next(error);
  }
});

//Register Handle
router.post("/register", (request, response) => {
  const { name, email, password, password2 } = request.body;

  //Validation checks
  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check required fields
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  //Redirecting to register page and pass in errors and data so that user is informed and form isn't completely cleared
  if (errors.length > 0) {
    response.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation passed
    // Store in db

    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exists
        errors.push({ msg: "Email is already registered" });
        response.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //when you have a model and want to create a new instance or new user then you have to use "new"

        // this creates a new user but does not save it
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hash Password
        //Check bcrypt doc for use of syntax but salt is generated, combined with password to generate hash and then User is saved with this new hashed password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //Set password to hashed
            newUser.password = hash;

            //Save User (.save() returns a promise)
            newUser
              .save()
              .then((user) => {
                request.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                response.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login Handle
router.post("/login", (request, response, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(request, response, next);
});

//Logout Handle
router.get("/logout", (request, response) => {
  //passport gives logout function
  request.logout();
  request.flash("success_msg", "You are logged out");
  response.redirect("/users/login");
});
module.exports = router;
