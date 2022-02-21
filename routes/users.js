const express = require('express')
const { register, login, editProfile, getUserList } = require('../controllers/users')
const { protect, userProtect } = require('../middleware/auth')
const { isAdmin } = require('../middleware/role')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/editProfile', userProtect, editProfile)
router.get('/list', [protect, isAdmin], getUserList)

module.exports = router