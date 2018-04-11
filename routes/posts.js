const
    express = require('express'),
    postsRouter = new express.Router(),
    postsCtrl = require('../controllers/posts.js')
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

// postsRouter.route('/posts/:id')
//     .get(postsCtrl.show)
//     .patch(postsCtrl.update)
//     .delete(postsCtrl.destroy)

postsRouter.get("/:id", postsCtrl.show)
postsRouter.patch("/:id", postsCtrl.update)
postsRouter.delete("/:id", postsCtrl.destroy)


module.exports = postsRouter