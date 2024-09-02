import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

// get all students
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All User retrieve Successfully',
    data: result,
  })
})

// get single student
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUserFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single User retrieve Successfully',
    data: result,
  })
})

// user delete
const userDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UserService.userDeleteFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Delete Successfully',
    data: result,
  })
})
export const UserControllers = {
  getAllUsers,
  getSingleUser,
  userDelete,
}
