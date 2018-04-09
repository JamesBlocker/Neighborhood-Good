const
    dotenv = require('dotenv').load(),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react-express-jwt',
    PORT = process.env.PORT || 3001
    userRoutes = require('./routes/users.js'),
    postsRoutes = require('./routes/posts.js')

mongoose.connect(MONGODB_URI, (err) => {
    console.log(err || 'Connected to MongoDB')
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.json({ message: "API root" })
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
})