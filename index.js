const express = require("express");
const app = express();

const expressSession = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require('passport');

require("dotenv").config();
require("./config/google_oauth_config");
require('./config/db');

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(5000);