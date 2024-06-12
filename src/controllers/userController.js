//User functionality handles receiving and sending data from the database to the user

const express = require('express');
const { getUser, getUserById, updateUserById, deleteUserById, insertUser, getUserByUserName, checkLogin } = require('../services/userServices');
const { generateToken } = require('../authen/methods');
const bcrypt = require('bcrypt');
const { use } = require('../routers/api');
const randToken = require('rand-token');
//User creation function
const register = async (req, res) => {
    const { password, name, phone, address, email, username } = req.body;

    try {
        if (password && name && phone && address && email && username) {
            const userNametemp = username.toLowerCase();
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            if (isEmail) {
                let checkUserName = await checkLogin(userNametemp);
                let checkEmail = await checkLogin(email);
                if ((checkUserName != null) || (checkEmail != null)) {
                    return res
                        .status(400)
                        .sen('The user name or email is existed!!!')
                } else {
                    if (phone.length < 6 || phone.length > 10) {
                        const hashPassword = bcrypt.hashSync(password, 10);
                        console.log(hashPassword);
                        const user = {
                            PassWord: hashPassword,
                            Name: name,
                            Phone: phone,
                            Address: address,
                            Email: email,
                            UserName: userNametemp
                        };
                        const checkInsert = await insertUser(user);
                        if (checkInsert) {
                            return res
                                .status(201)
                                .sen('User created successfully')
                        } else {
                            return res
                                .status(500)
                                .sen('User created fail')
                        }
                    } else {
                        return res
                            .status(400)
                            .sen('Invalid phone number')
                    }
                }
            } else {
                return res
                    .status(400)
                    .sen('The email invalid')
            }
        } else {
            return res
                .status(400)
                .sen('PassWord Name Phone Address Email Role and UserName is required')
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .sen(err)
    }
}


//Login function  
// account to test 
//  "UserName": "admin",
//  "PassWord": "123"
// const login = async (req, res) => {
//     const { PassWord, UserName } = req.body;
//     let userIdTemp = await checkLogin(UserName);
//     try {
//         if (PassWord && UserName) {
//             if (userIdTemp.length == null) {
//                 return res.json({
//                     status: 'err',
//                     message: 'Account does not exist'
//                 })
//             } else {
//                 const checkPassword = bcrypt.compareSync(PassWord, userIdTemp[0].PassWord);
//                 if (checkPassword) {
//                     return res.json({
//                         status: 'success',
//                         message: 'login successful'
//                     })
//                 } else {
//                     return res.json({
//                         status: 'err',
//                         message: 'Incorrect password'
//                     })
//                 }
//             }
//         } else {
//             return res.json({
//                 status: 'err',
//                 message: 'UserName and PassWord is required'
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return res.json({
//             status: 'err',
//             message: err.message
//         })
//     }
// }
const jwtVariable = {
    refreshTokenSize: 200 // do dai ki cu cua refereshtoken
};


const login = async (req, res) => {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        return res.status(400).send('Missing username, email or password.');
    }
    const usernameLower = username.toLowerCase();
    let user = null;
    const user1 = await checkLogin(username);
    const user2 = await checkLogin(email);
    if (!user1 && !user2) {
        return res.status(401).send('Username does not exist.');
    }
    if (!user1) {
        user = user2;
    } else {
        user = user1;
    }
    console.log(user)
    const isPasswordValid = bcrypt.compareSync(password, user.PassWord);
    if (!isPasswordValid) {
        return res.status(401).send('Incorrect password.');
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        username: user.UserName,
        role: user.Role,
        id: user.UserID
    };
    const accessToken = await generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res
            .status(401)
            .send('Login failed, please try again.');
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    if (!req.cookies.refreshToken) {
        // Nếu người dùng chưa có refresh token trong cookie, lưu refresh token vào cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    } else {
        // Nếu người dùng đã có refresh token trong cookie, lấy refresh token từ cookie
        refreshToken = req.cookies.refreshToken;
    }

    return res.status(200).json({
        msg: 'Logged in successfully.',
        accessToken,
        refreshToken,
    });
};

const logout = async (req, res) => {
    // Clear the refresh token cookie
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
    return res.status(200).send('Signed out successfully.');
};


module.exports = {
    register, login, logout
}