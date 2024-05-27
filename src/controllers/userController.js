const express = require('express');
const { getUser, getUserById, updateUserById, deleteUserById, insertUser, checkEmailValid, getUserByUserName } = require('../controllers/homeController');


const createUserController = async (req, res) => {
    const { PassWord, Name, Phone, Address, Email, UserName } = req.body;
    const user = {
        PassWord: PassWord,
        Name: Name,
        Phone: Phone,
        Address: Address,
        Email: Email,
        UserName: UserName
    };
    let userNameTemp = await getUserByUserName(UserName);
    // let emailTemp = await checkEmailValid(Email);
    try {
        if (PassWord && Name && Phone && Address && Email && UserName) {
            // const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email);
            // const isCheckEmail = emailTemp;
            const isUserId = userNameTemp;
            if (isUserId.length > 0) {
                return res.json({
                    status: 'err',
                    message: 'The user name is existed!!!'
                })
            } else {
                if (user.Phone.length == 10) {
                    const checkInser = await insertUser(user);
                    if (checkInser) {
                        return res.json({
                            status: 'success',
                            message: 'User created successfully'
                        });
                    } else {
                        return res.json({
                            status: 'err',
                            message: 'User created fail'
                        });
                    }
                } else {
                    return res.json({
                        status: 'err',
                        message: 'Invalid phone number'
                    });
                }
            }
        } else {
            return res.json({
                status: 'err',
                message: 'UserID PassWord Name Phone Address Email Role and UserName is required'
            })
        }
    } catch (err) {
        console.log(err);
        return res.json({
            status: 'err',
            message: err.message
        })
    }
}

const login = async (req, res) => {
    // const { UserID, Email, UserName } = req.body;

    // let userIdTemp = await getUserById(UserID);
    // let emailTemp = await checkEmailValid(Email);
    // try {
    //     if ((PassWord && Email) || (UserName && PassWord)) {
    //         const isEmail = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/.test(Email);
    //         if (isEmail) {
    //             const isCheckEmail = userIdTemp;
    //             const isUserId = emailTemp;
    //             if (isCheckEmail != null || isUserId != null) {
    //                 return res.json({
    //                     status: 'err',
    //                     message: 'The name or user name is existed!!!'
    //                 })
    //             } else {

    //             }

    //         } else {
    //             return res.json({
    //                 status: 'err',
    //                 message: 'user name is not a email'
    //             })
    //         }
    //     } else {
    //         return res.json({
    //             status: 'err',
    //             message: 'UserID PassWord Name Phone Address Email Role and UserName is required'
    //         })
    //     }
    // } catch (err) {
    //     console.log(err);
    //     return res.json({
    //         status: 'err',
    //         message: err.message
    //     })
    // }
}
module.exports = {
    createUserController, login
}