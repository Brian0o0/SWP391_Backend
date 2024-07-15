require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByEmails, insertUserOnGoogles } = require('../services/userServices')
const { generateToken } = require('../authen/methods');
const bcrypt = require('bcrypt');
const randToken = require('rand-token');

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

const jwtVariable = {
    refreshTokenSize: 200 // do dai ki cu cua refereshtoken
};

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (profile.emails && profile.emails.length > 0) {
                    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                    const email = profile.emails[0].value;
                    const existingUser = await getUserByEmails(email);
                    if (existingUser.length <= 0) {
                        const user = {
                            UserName: profile.id,
                            Email: email,
                            Name: profile.name.familyName + ' ' + profile.name.givenName
                        };
                        const createdUser = await insertUserOnGoogles(user);
                        if (!(createdUser.length <= 0)) {
                            const dataForAccessToken = {
                                UserName: createdUser.UserName,
                                Role: createdUser.Role,
                                Id: createdUser.UserId
                            };
                            const accessToken = await generateToken(
                                dataForAccessToken,
                                accessTokenSecret,
                                accessTokenLife,
                            );
                            if (!accessToken) {
                                return done(new Error('Create account fail!!!'), null);
                            }
                            return done(null, accessToken);
                        } else {
                            return done(new Error('Failed to create user'), null);
                        }
                    } else {
                        const dataForAccessToken = {
                            UserName: existingUser[0].UserName,
                            Role: existingUser[0].Role,
                            Id: existingUser[0].UserId
                        };
                        const accessToken = await generateToken(
                            dataForAccessToken,
                            accessTokenSecret,
                            accessTokenLife,
                        );
                        if (!accessToken) {
                            return done(new Error('Login Fail!!!'), null);
                        }
                        return done(null, accessToken);
                    }
                } else {
                    return done(new Error('No email found in Google profile'), null);
                }
            } catch (error) {
                return done(error, null);
            }
        })
);



