module.export = {
    ensureAuth: function (req , res, next) {
        if (req.isAuthenicated()) {
            return next();
        } else {
            res.redirect("/");
        }
    },
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenicated()){
            return next();
        } else {
            res.redirect("/dashboard");
        }
    },
};