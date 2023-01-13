import { db } from '../connect.js'
import moment from 'moment'
import jwt from 'jsonwebtoken'

export const getComments = (req, res) => {
    const q =
        'SELECT c.*, u.id as userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ?'

    db.query(q, req.query.postId, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addComments = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        const q = 'INSERT INTO comments(`userId`, `postId`, `desc`, `createAt`) VALUES (?)'

        const values = [
            userInfo.id,
            req.body.postId,
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Comment has been created!')
        })
    })
}

export const deleteComments = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        const commentId = req.params.commentId
        const q = 'DELETE FROM comments WHERE `id` = ? AND `userId` = ?'

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Delete comment successfully!')
        })
    })
}
