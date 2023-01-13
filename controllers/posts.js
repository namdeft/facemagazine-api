import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')

        const userId = req.query.userId

        const q =
            userId !== 'NaN'
                ? 'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createAt DESC'
                : 'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createAt DESC'
        const values = userId !== 'NaN' ? [userId] : [userInfo.id, userInfo.id]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const addPosts = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')

        const q = 'INSERT INTO posts (`userId`, `desc`, `img`, `createAt`) VALUES (?)'

        const values = [
            userInfo.id,
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Post has been created!')
        })
    })
}

export const deletePosts = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        const postId = req.params.postId
        const q = 'DELETE FROM posts WHERE `id` = ? AND `userId` = ?'

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Delete post successfully!')
        })
    })
}
