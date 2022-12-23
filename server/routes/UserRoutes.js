import express from "express";
const router = express.Router()

import {registerUser,loginUser} from '../controllers/UserController.js'

router.post('/signup',registerUser)
router.post('/signin',loginUser)

export default router;