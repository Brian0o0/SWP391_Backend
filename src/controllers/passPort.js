require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        accessToken => {
            console.log(accessToken);
        }
        // (profile, done) => {
        //     // Check if google profile exist.
        //     if (profile.id) {
        //         User.findOne({ googleId: profile.id })
        //             .then((existingUser) => {
        //                 if (existingUser) {
        //                     done(null, existingUser);
        //                 } else {
        //                     new User({
        //                         googleId: profile.id,
        //                         email: profile.emails[0].value,
        //                         name: profile.name.familyName + ' ' + profile.name.givenName
        //                     })
        //                         .save()
        //                         .then(user => done(null, user));
        //                 }
        //             })
        //     }
        // }
    )
);
