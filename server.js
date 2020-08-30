//loading required modules
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// const path = require("path");

//localhost port
let PORT = 2000;

//Passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser (used to read body portion of incoming request stream)
app.use(express.urlencoded({ extended: false }));

//Express Session (generates session cookies to match with data stored server side i.e logged-in user)
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "rumour",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash session (used when pages are being re-rendered to display messages )
app.use(flash());

//Global variables (since messages will have different colours)
app.use((request, response, next) => {
  //to set a global variable, do response.locals.newVariable
  response.locals.success_msg = request.flash("success_msg");
  response.locals.error_msg = request.flash("error_msg");
  response.locals.error = request.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//app.use(express.static(path.join(__dirname, "./static")));

/* app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "./login.html"));
}); */

app.listen(PORT, () => {
  console.log(`Express is listening at port ${PORT}`);
});
