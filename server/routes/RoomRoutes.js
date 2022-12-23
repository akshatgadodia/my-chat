import express from "express";
const router = express.Router()

import {createRoom,getRoomById} from '../controllers/RoomController.js'

router.post('/',createRoom)
router.post('/joinRoom',getRoomById)

export default router;