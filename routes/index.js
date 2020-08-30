const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

//Welcome Page
router.get("/", (request, response, next) => {
  try {
    response.render("welcome");
  } catch (error) {
    return next(error);
  }
});

//Dashboard
router.get("/dashboard", ensureAuthenticated, (request, response) => {
  response.render("dashboard", {
    name: request.user.name,
  });
});

module.exports = router;
