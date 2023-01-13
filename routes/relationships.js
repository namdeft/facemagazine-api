import express from 'express'
import {
    getFollowedUserId,
    getFollowerUserIds,
    addRelationships,
    deleteRelationships,
} from '../controllers/relationships.js'

const router = express.Router()

router.get('/followerUserId', getFollowerUserIds)
router.get('/followedUserId', getFollowedUserId)
router.post('/', addRelationships)
router.delete('/', deleteRelationships)

export default router
