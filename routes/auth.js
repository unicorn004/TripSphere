const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to start the Google authentication process
router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"],
}));

// Callback route that Google will redirect to after successful authentication
router.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "/", // Redirect here on failure
}), (req, res) => {
    // Successful authentication, redirect to your frontend
    res.redirect('http://localhost:3000/home'); // Adjust the URL to match your frontend
});

// Route to log out the user
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/'); // Redirect to the home page or login page
    });
});

module.exports = router;
