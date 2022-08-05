const { Router } = require('express')
const router = Router()
const { userRegister, userLogin } = require('../controllers/user.js')

router.post('/register', userRegister)
router.post('/login', userLogin)

module.exports = router