const router = require('express').Router()
const { createPost, updatePost, deletePost, getOnePost, getAllPosts } = require('../controllers/post.js')
const { route } = require('./user')


router.post('/createPost', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id', getOnePost)
router.get('/', getAllPosts)

module.exports = router