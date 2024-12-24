import mongoose, { Schema } from 'mongoose'
import { IFavorite } from './favorite.interface'

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rooms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Room',
      required: true,
    },
  },
  { timestamps: true },
)

export const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema)
