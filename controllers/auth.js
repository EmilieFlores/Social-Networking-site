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
            req.flash("errors", info);
            return res.redirect("/login");
        }
        req.logIn(user,(err) =>{
            if(err) {
                return next(err);
            }
            req.flash("success", {msg: "Success! You are logged in."});
            res.redirct(req.session.returnTo || "/profile");
        });
    })(requ, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        console.log('User has logged out.')
    })
    req.session.destroy((err) => {
        if(err)
        console.log("Error : Failed to destroy the session during logout.", err)
        req.user = null;
        res.redirect("/");
    });
};

exports.getSignup = (req, res) => {
    if(req.user) {
        return res.redirct("/profile");
    }
    res.render("signup", {
        title: "Create Account",
    });
};

exports.postSignup = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({msg: "Please enter a vaild email address."});
    if(!validator.isLength(req.body.password, {min: 8}))
    validationErrors.push({
        msg: "Password must be at least 8 characters long",
    });
    if(req.body.password !== req.body.confirmPassword)
        validationErrors.push({msg: "Passwords do not match"});
    
}




