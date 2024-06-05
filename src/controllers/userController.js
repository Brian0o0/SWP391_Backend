//User functionality handles receiving and sending data from the database to the user

const express = require('express');
const { getUser, getUserById, updateUserById, deleteUserById, insertUser, getUserByUserName } = require('../services/userServices');
const bcrypt = require('bcrypt');

//User creation function
const createUser = async (req, res) => {
    const { PassWord, Name, Phone, Address, Email, UserName } = req.body;
    let userNameTemp = await getUserByUserName(UserName);
    // let emailTemp = await checkEmailValid(Email);
    try {
        if (PassWord && Name && Phone && Address && Email && UserName) {
            const isEmail = /^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(Email);
            if (isEmail) {
                const isUserName = userNameTemp;
                if (isUserName.length > 0) {
                    return res.json({
                        status: 'err',
                        message: 'The user name is existed!!!'
                    })
                } else {
                    if (Phone.length == 10) {
                        const hashPassword = bcrypt.hashSync(PassWord, 10);
                        console.log(hashPassword);
                        const user = {
                            PassWord: hashPassword,
                            Name: Name,
                            Phone: Phone,
                            Address: Address,
                            Email: Email,
                            UserName: UserName
                        };
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
                    message: 'The email invalid'
                })
            }
        } else {
            return res.json({
                status: 'err',
                message: 'PassWord Name Phone Address Email Role and UserName is required'
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


//Login function  
// account to test 
//  "UserName": "admin",
//  "PassWord": "123"
const login = async (req, res) => {
    const { PassWord, UserName } = req.body;
    let userIdTemp = await getUserByUserName(UserName);
    try {
        if (PassWord && UserName) {
            if (userIdTemp.length <= 0) {
                return res.json({
                    status: 'err',
                    message: 'Account does not exist'
                })
            } else {
                const checkPassword = bcrypt.compareSync(PassWord, userIdTemp[0].PassWord);
                if (checkPassword) {
                    return res.json({
                        status: 'success',
                        message: 'login successful'
                    })
                } else {
                    return res.json({
                        status: 'err',
                        message: 'Incorrect password'
                    })
                }
            }
        } else {
            return res.json({
                status: 'err',
                message: 'UserName and PassWord is required'
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
module.exports = {
    createUser, login
}