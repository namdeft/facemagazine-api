import express from 'express'

import { getComments, addComments, deleteComments } from '../controllers/comments.js'

const router = express.Router()

router.get('/', getComments)
router.post('/', addComments)
router.delete('/:commentId', deleteComments)

export default router
