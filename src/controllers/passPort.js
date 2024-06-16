require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByEmails, insertUserOnGoogles } = require('../services/userServices')



// passport.serializeUser((user, done) => {
//     done(null, user.Email); // Serialize user theo email
//     console.log("wdasdasd")
// });

// passport.deserializeUser(async (email, done) => {
//     try {
//         console.log("asd222")
//         const existingUser = await getUserByEmails(email);
//         if (existingUser) {
//             console.log("wdasdss12sd")
//             done(null, existingUser); // Tìm thấy người dùng
//         } else {
//             done(null, null); // Không tìm thấy người dùng
//         }
//     } catch (error) {
//         done(error, null); // Xử lý lỗi nếu có
//     }
// });


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (profile.emails && profile.emails.length > 0) {
                    const email = profile.emails[0].value;
                    const existingUser = await getUserByEmails(email);
                    if (existingUser.length <= 0) {
                        const user = {
                            UserName: profile.id,
                            Email: email,
                            Name: profile.name.familyName + ' ' + profile.name.givenName
                        };
                        const createdUser = await insertUserOnGoogles(user);
                        if (createdUser) {
                            return done(null, createdUser[0]);
                        } else {
                            return done(new Error('Failed to create user'), null);
                        }
                    } else {
                        return done(null, existingUser[0]);
                    }
                } else {
                    return done(new Error('No email found in Google profile'), null);
                }
            } catch (error) {
                return done(error, null);
            }
        })
);

