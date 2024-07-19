//User functionality handles receiving and sending data from the database to the user

const express = require('express');
const { getAllUsers, getUserByIds, updateUserByIds, deleteUserByIds, insertUsers, getUserByUserNames, checkLogin, getUserByNames, getTotalUsers } = require('../services/userServices');
const { generateToken } = require('../authen/methods');
const bcrypt = require('bcrypt');
// const { use } = require('../routers/api');
const randToken = require('rand-token');

const getAllUser = async (req, res) => {
    try {
        const user = await getAllUsers();
        if (user.length <= 0) {
            return res
                .status(404)
                .send('Empty user list')
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getTotalUser = async (req, res) => {
    try {
        const user = await getTotalUsers();
        if (user.length <= 0) {
            return res
                .status(404)
                .send('Empty user list')
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.query.UserId;
        const user = await getUserByIds(userId);
        if (user.length <= 0) {
            return res
                .status(404)
                .send('Empty user list')
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getUserByUserName = async (req, res) => {
    try {
        const userName = req.query.UserName;
        const user = await getUserByUserNames(userName);
        if (user.length <= 0) {
            return res
                .status(404)
                .send('Empty user list')
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getUserByName = async (req, res) => {
    try {
        const name = req.query.Name;
        const user = await getUserByNames(name);
        if (user.length <= 0) {
            return res
                .status(404)
                .send('Empty user list')
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

// const insertUser = async (req, res) => {
//     try {
//         const { name, unit, buyPrice, costIdMaterial } = req.body
//         if (name && unit && buyPrice && costIdMaterial) {
//             const material = {
//                 Name: name,
//                 Unit: unit,
//                 BuyPrice: parseFloat(buyPrice),
//                 CostIDMaterial: parseInt(costIdMaterial)

//             }
//             const check = await insertMaterials(material);
//             if (check == false) {
//                 return res
//                     .status(500)
//                     .sen('Insert material fail')
//             } else {
//                 return res
//                     .status(200)
//                     .sen('Insert material successfully')
//             }
//         } else {
//             return res
//                 .status(400)
//                 .sen('Material is required')
//         }

//     } catch (error) {
//         console.log(error);
//         return res
//             .status(500)
//             .sen(error)
//     }
// }

const deleteUserById = async (req, res) => {
    try {
        const { UserId } = req.body
        const check = await deleteUserByIds(UserId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete user fail')
        } else {
            return res
                .status(200)
                .send('Delete user successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateUserById = async (req, res) => {
    try {
        const { Name, Phone, Address, Role, UserId, PassWord, Email, UserName } = req.body
        const user = {
            Name: Name,
            Phone: Phone,
            Address: Address,
            Role: parseInt(Role),
            UserId: parseInt(UserId),
            PassWord: PassWord,
            Email: Email,
            UserName: UserName.toLowerCase()
        }
        const check = await updateUserByIds(user);
        if (check == false) {
            return res
                .status(500)
                .send('Update user fail')
        } else {
            return res
                .status(200)
                .send('Update user successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}



//User creation function
const register = async (req, res) => {
    const { PassWord, Name, Phone, Address, Email, UserName } = req.body;

    try {
        if (PassWord && Name && Phone && Address && Email && UserName) {
            const userNametemp = UserName.toLowerCase();
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email);
            if (isEmail) {
                let checkUserName = await checkLogin(userNametemp);
                let checkEmail = await checkLogin(Email);
                if ((checkUserName != null) || (checkEmail != null)) {
                    return res
                        .status(400)
                        .send('The user name or email is existed!!!')
                } else {
                    if (Phone.length === 10) {
                        const hashPassword = bcrypt.hashSync(PassWord, 10);
                        console.log(hashPassword);
                        const user = {
                            PassWord: hashPassword,
                            Name: Name,
                            Phone: Phone,
                            Address: Address,
                            Email: Email,
                            UserName: userNametemp
                        };
                        const checkInsert = await insertUsers(user);
                        if (checkInsert) {
                            return res
                                .status(201)
                                .send('User created successfully')
                        } else {
                            return res
                                .status(500)
                                .send('User created fail')
                        }
                    } else {
                        return res
                            .status(400)
                            .send('Invalid phone number')
                    }
                }
            } else {
                return res
                    .status(400)
                    .send('The email invalid')
            }
        } else {
            return res
                .status(400)
                .send('PassWord Name Phone Address Email Role and UserName is required')
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send(error.message)
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
    const { UserName, Email, PassWord } = req.body;

    if ((!UserName && !Email) || !PassWord) {
        return res.status(400).send('Missing username, email or password.');
    }
    const usernameLower = UserName.toLowerCase();
    let user = null;
    const user1 = await checkLogin(usernameLower);
    const user2 = await checkLogin(Email);
    if (!user1 && !user2) {
        return res.status(401).send('Username does not exist.');
    }
    if (!user1) {
        user = user2;
    } else {
        user = user1;
    }
    console.log(user)
    const isPasswordValid = bcrypt.compareSync(PassWord, user.PassWord);
    if (!isPasswordValid) {
        return res.status(401).send('Incorrect password.');
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        UserName: user.UserName,
        Role: user.Role,
        Id: user.UserId
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

// const loginWithEmail = async (req, res) => {
//     const { username, email, password } = req.body;
//     if ((!username && !email) || !password) {
//         return res.status(400).send('Missing username, email or password.');
//     }
//     const usernameLower = username.toLowerCase();
//     let user = null;
//     const user1 = await checkLogin(username);
//     const user2 = await checkLogin(email);
//     if (!user1 && !user2) {
//         return res.status(401).send('Username does not exist.');
//     }
//     if (!user1) {
//         user = user2;
//     } else {
//         user = user1;
//     }
//     console.log(user)
//     const isPasswordValid = bcrypt.compareSync(password, user.PassWord);
//     if (!isPasswordValid) {
//         return res.status(401).send('Incorrect password.');
//     }

//     const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
//     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//     const dataForAccessToken = {
//         username: user.UserName,
//         role: user.Role,
//         id: user.UserID
//     };
//     const accessToken = await generateToken(
//         dataForAccessToken,
//         accessTokenSecret,
//         accessTokenLife,
//     );
//     if (!accessToken) {
//         return res
//             .status(401)
//             .send('Login failed, please try again.');
//     }

//     let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
//     if (!req.cookies.refreshToken) {
//         // Nếu người dùng chưa có refresh token trong cookie, lưu refresh token vào cookie
//         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
//     } else {
//         // Nếu người dùng đã có refresh token trong cookie, lấy refresh token từ cookie
//         refreshToken = req.cookies.refreshToken;
//     }

//     return res.status(200).json({
//         msg: 'Logged in successfully.',
//         accessToken,
//         refreshToken,
//     });
// };



module.exports = {
    register,
    login,
    logout,
    getAllUser,
    getUserById,
    getUserByUserName,
    // insertUser,
    deleteUserById,
    updateUserById,
    getUserByName,
    getTotalUser,
}