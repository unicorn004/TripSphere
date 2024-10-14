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
    res.cookie('user', JSON.stringify(req.user), { httpOnly: false });
    res.redirect('http://localhost:5173/city'); // Adjust the URL to match your frontend
    // return res.status(201).json({
    //     success: true,
    //     user: req.user
    // });
});

// Route to log out the user
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('http://localhost:5173/'); // Redirect to the home page or login page
    });
});


module.exports = router;
