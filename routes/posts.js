const
    express = require('express'),
    postsRouter = new express.Router(),
    Post = require('../models/Post.js'),
    { verifyToken } = require('../serverAuth.js')

postsRouter.get('/', (req, res) => {
    Post.find({}).populate('user').exec((err, posts) => {
        res.json(posts)
    })
})

postsRouter.use(verifyToken)

postsRouter.post('/', (req, res) => {
    console.log(req.user)
    Post.create({...req.body, user: req.user}, (err, post) => {
        res.json({ success: true, message: "Post created 🍦", post })
    })
})

module.exports = postsRouter