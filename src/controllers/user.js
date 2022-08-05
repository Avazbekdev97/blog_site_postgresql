const pool = require('../config/db.js')
const sha256 = require('sha256')

exports.userRegister = async (req, res) => {
    try {

        let { username, email, password } = req.body
        username = username.trim()
        email = email.trim()
        password = password.trim()

        const newUser = await pool.query(`
        INSERT INTO users (user_name, email, user_password) VALUES ($1, $2, $3) RETURNING *    
        `, [username, email, sha256(password)])

        res.status(201).json({
            status: 201,
            message: "The user succesfully registered!"
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message,
            token: null
        })
    }
}

exports.userLogin = async (req, res) => {
    try {

        let { username, password } = req.body

        username = username.trim()
        password = password.trim()

        let users = await pool.query('SELECT * FROM users')
        users = users.rows

        const user = users.find(user => user.user_name == username && user.user_password == sha256(password))

        if(user) {
            return res.status(200).json({
                status: 200,
                message: "The user successfully loggen in",
            })
        }

        throw new Error('Wrong username or password')

    } catch(error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}