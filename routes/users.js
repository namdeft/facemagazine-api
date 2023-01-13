import express from 'express'
import { getAllUser } from '../controllers/users.js'

const router = express.Router()

router.get('/', getAllUser)

export default router
