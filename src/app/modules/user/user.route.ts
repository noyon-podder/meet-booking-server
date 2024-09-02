import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.get('/users', UserControllers.getAllUsers)

router.get('/:id', UserControllers.getSingleUser)

router.delete('/:id', UserControllers.userDelete)
export const UserRoutes = router
