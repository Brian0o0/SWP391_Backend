require('dotenv').config();
import jwt from "jsonwebtoken";


const createJWt = () => {
    let token = jwt.sign({ user: 'user' }, sec)
}