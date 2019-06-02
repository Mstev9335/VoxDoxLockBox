// IMPORT PASSPORT packages required
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// check passport against models folder
var db = require("../models");

// Use LOCAL Strategy
passport.use(new LocalStrategy(
    // email instead of username
    {
        usernameField: "email"
    },
    function (email, password, done) {
        // run this at auth attempt
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "User Not Found..."
                });
            }
            // Incorrect password
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect Password..."
                });
            }
            return done(null, dbUser);
        });
    }
));

// Sequelize has to serialize and deserialize the user 
// boilerplate
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// exporting passport
module.exports = passport;