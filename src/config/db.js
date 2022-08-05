const Pool = require('pg').Pool

const pool = new Pool({
    //user: process.env.DB_USERNAME,
    //password: process.env.DB_PASSWORD,
    //database: process.env.DB_NAME,
    //host: process.env.DB_HOST,
    //port: process.env.PORT   
    connectionString: 'postgres://postgres:bek972710@localhost:5432/blog_site'
})

module.exports = pool 

//connectionString: 'postgres://postgres:bek972710@localhost:5432/auth'