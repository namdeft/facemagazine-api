import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'

import userRoute from './routes/user.js'
import usersRoute from './routes/users.js'
import postsRoute from './routes/posts.js'
import authRouter from './routes/auth.js'
import commentsRouter from './routes/comments.js'
import likesRouter from './routes/likes.js'
import relationshipsRouter from './routes/relationships.js'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRouter)
app.use('/api/likes', likesRouter)
app.use('/api/relationships', relationshipsRouter)

app.listen(PORT || 8080, (req, res) => {
    console.log(`Localhost is running in port: ${PORT} `)
})
