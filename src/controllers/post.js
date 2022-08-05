const pool = require('../config/db.js')

exports.createPost = async (req, res) => {
    try {

        let { author, title } = req.body

        author = author.trim()
        title = title.trim()

        const newPost = await pool.query(`
        INSERT INTO posts (author, title) VALUES ($1, $2) RETURNING *
        `, [author, title])

        res.status(201).json({
            status: 201,
            message: "The post successfully "
        })


    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.updatePost = async (req, res) => {
    try {

        const { id } = req.params

        let { author, title } = req.body   
        
        const oldPost = await pool.query('SELECT * FROM posts WHERE postId = $1', [id])

        const updatePost = await pool.query(`
        UPDATE posts SET author = $1, title = $2 WHERE postId = $3 RETURNING *
        `, [
            author ? author : oldPost.rows[0].author,
            title  ? title : oldPost.rows[0].title,
            id
           ])

        res.status(201).json(updatePost.rows[0])   

    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.deletePost = async (req, res) => {
    try {

        const { id } = req.params

        await pool.query('DELETE FROM posts WHERE postId = $1', [id])

        res.status(200).json({
            status: 200,
            message: "Post Deleted"
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.getOnePost = async (req, res) => {

    try {

        const { id } = req.params

        const post = await pool.query('SELECT * FROM posts WHERE postId = $1', [id])

        res.status(200).json({
            status: 200,
            message: post
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }

}

exports.getAllPosts = async (req, res) => {
    try {

        const allPosts = await pool.query("SELECT * FROM posts")

        res.status(200).json({
            status: 200,
            message: allPosts.rows
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}