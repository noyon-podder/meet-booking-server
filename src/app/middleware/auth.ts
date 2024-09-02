import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'

const auth = (...authorizedRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    // if not token send, sent to error
    if (!authHeader) {
      throw new AppError(401, 'Authorization header is missing')
    }

    const token = authHeader.split(' ')[1]

    // bearer not send send to error
    if (!token) {
      throw new AppError(401, 'Token With Bearer is missing')
    }
    // checking token validity
    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload

    const { email, role } = decoded

    // check the user is exist
    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    // check the user is deleted
    if (user.isDeleted) {
      throw new AppError(403, 'User is deleted')
    }

    // check the user role and permission route
    if (authorizedRole && !authorizedRole.includes(role)) {
      throw new AppError(401, 'You have no access to this route')
    }

    // save the user in req.user
    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
