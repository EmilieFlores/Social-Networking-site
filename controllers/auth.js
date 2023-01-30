const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
    if(req.user) {
        return res.redirect("/profile");
    }
    res.render("login", {
        title: "login",
    });
};

exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({msg: "please enter a vaild email address."});
    if (validator.isEmpty(req.body.password))
        validationErrors.push({msg: "Password cannot be blank."});

    if (validationErrors.length){
        req.flash("errors", validationErrors);
        return res.redirect("/login");
    } 
    req.body.email = validator.normalizeEmail(req,body.email,{
        gmail_remove_dots: false,
    });

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if(!user){
            req.flash("errors", )
        }
    })
}