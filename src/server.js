const express = require('express')
const dotenv = require('dotenv')
const app = express()
const { Client } = require('pg');



dotenv.config()

const userAuth = require('./routes/user.js')
const post = require('./routes/post.js')
 

app.use(express.json())
app.use('/api', userAuth)
app.use('/api', post)
  
app.listen(process.env.PORT, () => console.log('server is running on http://localhost:' + process.env.PORT))