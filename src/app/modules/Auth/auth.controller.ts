import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

// create a user
const createUser = catchAsync(async (req, res) => {
  const data = req.body

  const result = await AuthServices.createUserIntoDB(data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Create Successfully',
    data: result,
  })
})

// login user with email and password
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserWithEmailAndPassword(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    token: result.token,
    data: result.user,
  })
})

export const AuthControllers = {
  createUser,
  loginUser,
}
