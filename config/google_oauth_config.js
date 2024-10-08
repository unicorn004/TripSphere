var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/user');
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // Check for an existing user by email
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          // No username field here
        });

        await user.save();
      }

      // Pass the user to the next middleware
      cb(null, user);
    } catch (err) {
      console.error('Error during user registration:', err);
      cb(err, false); // Handle error
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
