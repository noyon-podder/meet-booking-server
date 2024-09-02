import { model, Schema } from 'mongoose'
import { TSlot } from './slot.interface'

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

slotSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: true } })
})

slotSchema.pre('findOne', function () {
  this.where({ isDeleted: { $ne: true } })
})

export const Slot = model<TSlot>('Slot', slotSchema)
