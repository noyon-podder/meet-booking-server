import { Types } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'user' | 'admin'
  isDeleted: boolean
  favorites: [Types.ObjectId]
}

export type TUserRole = keyof typeof USER_ROLE
