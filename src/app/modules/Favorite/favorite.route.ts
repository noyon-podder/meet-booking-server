import { Router } from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { FavoriteControllers } from './favorite.controller'

const router = Router()

router.post(
  '/add-favorite/:roomId',
  auth(USER_ROLE.user),
  FavoriteControllers.addFavorite,
)

router.post(
  '/remove-favorite/:roomId',
  auth(USER_ROLE.user),
  FavoriteControllers.removeFavorite,
)

export const FavoriteRoutes = router
