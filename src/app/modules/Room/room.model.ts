import { model, Schema } from 'mongoose'
import { TRoom } from './room.interface'

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  floorNo: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerSlot: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    default: [],
  },
  amenities: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

// Pre middleware to exclude documents where isDeleted is true
roomSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: true } })
})

roomSchema.pre('findOne', function () {
  this.where({ isDeleted: { $ne: true } })
})

export const Room = model<TRoom>('Room', roomSchema)
