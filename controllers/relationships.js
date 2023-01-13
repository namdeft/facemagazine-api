import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getFollowerUserIds = (req, res) => {
    const q = 'SELECT followerUserId FROM relationships WHERE followedUserId = ?'

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map((element) => element.followerUserId))
    })
}

export const getFollowedUserId = (req, res) => {
    const q = 'SELECT followedUserId FROM relationships WHERE followerUserId = ?'

    db.query(q, [req.query.followerUserId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map((element) => element.followedUserId))
    })
}

export const addRelationships = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        const q = 'INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES (?)'
        const values = [req.query.followedUserId, userInfo.id]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Following successfully!')
        })
    })
}

export const deleteRelationships = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        const q = 'DELETE FROM relationships WHERE `followedUserId` = ? AND `followerUserId` = ?'

        db.query(q, [req.query.followedUserId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Unfollow successfully!')
        })
    })
}
