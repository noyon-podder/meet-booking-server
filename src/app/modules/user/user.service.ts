import AppError from '../../errors/AppError'
import { User } from './user.model'

// user login with access token

const userLoginFromDB = async (email: string, password: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(404, 'User Not Found')
  }

  if (user.password !== password) {
    throw new AppError(401, 'Invalid Password')
  }

  return user
}

// get all user
const getAllUsersFromDB = async () => {
  const result = await User.find({})

  return result
}

// single user from db
const getSingleUserFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id })

  if (!user) {
    throw new AppError(404, 'User Not Found')
  }

  return user
}

// single user soft delete from db
const userDeleteFromDB = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  )

  return result
}

export const UserService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  userDeleteFromDB,
  userLoginFromDB,
}
