import { Types } from 'mongoose'

export interface IFavorite {
  userId: Types.ObjectId
  rooms: Types.ObjectId[]
}
