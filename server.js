const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env"});

//Passport config 
require("./config/passport")(passport);

//connect to Database
connectDB();

//Using EJS for views 
app.set("view engine", "ejs");

//static folder
app.use(express.static("public"));

//Body parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//logging
app.use(logger("dev"));

//Use forms for put/delete 
app.use(methodOverride("_method"));

//Setup sessions -stored in MongoDb 
app.use(
    
)













