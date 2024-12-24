import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { FavoriteServices } from './favorite.service'
import sendResponse from '../../utils/sendResponse'

// ADD FAVORITE
const addFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId
  const { roomId } = req.params

  const result = await FavoriteServices.addFavoriteFromDb(userId, roomId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Favorite Add',
    data: result,
  })
})

// REMOVE FAVORITE
const removeFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId
  const { roomId } = req.params

  const result = await FavoriteServices.removeFavoriteFromDB(userId, roomId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Favorite Remove',
    data: result,
  })
})
export const FavoriteControllers = {
  addFavorite,
  removeFavorite,
}
