const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User, validateUser } = require('../models/user');

router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "/",
}), async (req, res) => {
    const { email } = req.user;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.cookie('user', JSON.stringify(existingUser), { httpOnly: false });
        return res.redirect(`${process.env.FRONTEND_URL}/home`);
    }

    res.cookie('user', JSON.stringify(req.user), { httpOnly: false });
    res.redirect(`${process.env.FRONTEND_URL}/city`);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(`${process.env.FRONTEND_URL}/`);
    });
});

module.exports = router;