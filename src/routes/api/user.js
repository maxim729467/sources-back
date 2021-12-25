const express = require('express')
const router = express.Router()

const { loginUser, logoutUser } = require('../../controllers/userControllers')
const authMiddleware = require('../../middlewares/authMiddleware')
const { validateLogin } = require('../../middlewares/validationMiddleware')

router.post('/login', validateLogin, loginUser)
router.post('/logout', authMiddleware, logoutUser)

module.exports = router
