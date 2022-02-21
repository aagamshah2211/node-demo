const User = require('../models/users')
const asyncHandler = require('../middleware/async')

//@desc Register User
//@route POST api/user/register
//@access Public
exports.register = asyncHandler(async(req, res) => {
    const user = await User.create(req.body)
    res.status(200).json({
        result: true,
        message: 'You have been registered successfully'
    })
})

//@desc Login User
//@route POST api/user/login
//@access Public
exports.login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            result: false,
            message: 'Please provide email and Password'
        })
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        res.status(400).json({
            result: false,
            message: 'Please provide correct credentials'
        })
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        res.status(400).json({
            result: false,
            message: 'Wrong Email Or Password'
        })
    }
    sendTokenResponse(user, 200, res)
})

//@desc Edit User
//@route PUT api/user/editProfile
//@access Private
exports.editProfile = asyncHandler(async(req, res) => {
    const body = req.body
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, body, { new: true })
    res.status(200).json({
        result: true,
        message: `Profile updated successfully.`
    })
})

//@desc List User
//@route GET api/user/list
//@access Private
exports.getUserList = asyncHandler(async(req, res) => {
    const user = await User.find({ isAdmin: false }).lean()
    res.status(200).json({
        result: true,
        data: user
    })
})

//Get token from model, create header and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    res.status(statusCode).header('x-auth-token', token).json({
        result: true,
        message: 'You Have Logged in Successfully'
    })
}