const jwt = require('jsonwebtoken')
const User = require('../models/users')

exports.protect = async(req, res, next) => {
    let token
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            throw new Error()
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        req.user = await User.findById(decode.id)
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            result: false,
            message: 'You are not authorized to this route'
        })
    }
}

exports.userProtect = async(req, res, next) => {
    let token
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            throw new Error()
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        req.user = await User.findOne({ _id: decode.id, isAdmin: 'false' })
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            result: false,
            message: 'You are not authorized to this route'
        })
    }
}