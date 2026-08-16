import express from 'express'
import { loginUser, registerUser, createAdmin } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// TEMPORARY - Only for testing (will remove before deployment)
userRouter.post('/create-admin', createAdmin)

export default userRouter