// const router  = express.Router();
const path    = require('path');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
        //
        app.get("/", function(req, res) {
          // If the user already has an account send them to the members page
          if (req.user) {
            res.redirect("/members");
          }

          res.render(path.join(__dirname, "../views/pages/index.ejs"));

        });
      
        app.get("/login", function(req, res) {
          // If the user already has an account send them to the members page
          if (req.user) {
            res.redirect("/members");
          }
          res.render(path.join(__dirname, "../views/pages/login.ejs"));

          // res.sendFile(path.join(__dirname, "../public/login.html"));
        });
      
        // Here we've add our isAuthenticated middleware to this route.
        // If a user who is not logged in tries to access this route they will be redirected to the signup page
        app.get("/members", isAuthenticated, function(req, res) {
          // res.sendFile(path.join(__dirname, "../public/members.html"));
           res.render(path.join(__dirname, "../views/pages/members.ejs"));
        });

        app.get("/signUp", function(req, res) {
          res.render(path.join(__dirname, "../views/pages/signup.ejs"));
        });

        // app.get("/createEvent", function(req, res) {
        //   res.render(path.join(__dirname, "../views/pages/createEvent.ejs"));

         app.get("/create", isAuthenticated, function(req, res) {
          res.render(path.join(__dirname, "../views/pages/create.ejs"));
        });

        app.get("/all", function(req, res) {
          res.render(path.join(__dirname, "../views/pages/all.ejs"));
        });

        // app.get("/index", isAuthenticated, function(req, res) {
        //   res.render(path.join(__dirname, "../views/pages/index.ejs"));
        // });
}

// router.get('/survey', (req, res) => {
//     res.sendFile( path.join(__dirname,'../public/survey.html' ));
// });
