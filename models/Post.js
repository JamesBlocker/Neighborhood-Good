const 
    mongoose = require('mongoose')
    postSchema = new mongoose.Schema({
        title: {type: String, required: true},
        body: {type: String, required: true},
        image_url: String,
        link: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    })

const Post = mongoose.model('Post', postSchema)
module.exports = Post