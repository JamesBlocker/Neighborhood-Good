const Post = require('../models/Post.js')

module.exports = {
    show: (req, res) => {
        Post.findById(req.params.id, (err, thatPost) => {
            res.json(thatPost)
        })
    },

    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
            if(err) return res.json({ success: false })
            res.json({ success: true, message: "Post updated", post: updatedPost })
        })
    },

    destroy: (req, res) => {
        Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
            if(err) return res.json({ success: false })
            res.json({ success: true, message: "Post deleted" })
        })
    }
}