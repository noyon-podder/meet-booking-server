import config from '../../config'
import AppError from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// create a new user
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)

  return result
}

const loginUserWithEmailAndPassword = async (payload: TLoginUser) => {
  const { email, password } = payload

  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(404, 'User Not Found')
  }

  if (user.isDeleted) {
    throw new AppError(404, 'User Not Found')
  }

  // password match
  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid Email or Password!!')
  }

  // create jwt payload
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  const refreshToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as string,
  })

  return { token: refreshToken, user }
}

export const AuthServices = {
  createUserIntoDB,
  loginUserWithEmailAndPassword,
}
