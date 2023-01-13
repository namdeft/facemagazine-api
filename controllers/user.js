import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = 'SELECT * FROM users WHERE id = ?'

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...userInfo } = data[0]
        return res.status(200).json(userInfo)
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        const q = 'UPDATE users SET `name` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?'

        const values = [req.body.name, req.body.profilePic, req.body.coverPic, userInfo.id]

        db.query(
            q,
            [req.body.name, req.body.profilePic, req.body.coverPic, userInfo.id],
            (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json('Update user information successfully!')
            }
        )
    })
}
