import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getAllUser = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        const q = 'SELECT * from users WHERE id != ?'

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}
