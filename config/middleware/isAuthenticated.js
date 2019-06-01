// middleware for restricting routes
module.exports = function(req, res, next) {
    // if user logs in continue with request to restricted route
    if (req.user) {
        return next();
    }
    return res.redirect("/");
};