var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/members");
    });


    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_identifier: req.body.user_identifier

        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            //   res.status(422).json(err.errors[0].message);
        });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                username: req.user.username,
                id: req.user.id,
                user_identifier: req.user.user_identifier
            });
        }
    });

    //gets all events in the database.

    app.get("/api/events", function (req, res) {
        var query = {};

        if (req.query.user_id) {
            req.query.UserId = req.query.user_id;
        };

        db.Event.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

    //gets all events belonging to a specific user.
    app.get("/api/events/:userId", function (req, res) {
        db.Event.findAll({
            where: {
                userId: req.params.userId
            },
            include: [db.User]
        }).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

//gets all events within a specific category.
    app.get("/api/events/:category", function (req, res) {
        db.Event.findAll({
            where: {
                category: req.params.category
            }
        }).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

//posts new events to the database.
    app.post("/api/events", function (req, res) {
        db.Event.create(req.body).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

//removes events from the db.
    app.delete("/api/events/:id", function (req, res) {
        db.Event.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

//updates events in the db.
    app.put("/api/events", function (req, res) {
        db.Event.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbEvent) {
                res.json(dbEvent);
            });
    });

};