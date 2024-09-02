import { Types } from 'mongoose'

export type TBooking = {
  date: string
  slots: [Types.ObjectId]
  room: Types.ObjectId
  user: Types.ObjectId
  isConfirmed: 'confirmed' | 'unconfirmed'
  totalAmount: number
  isDeleted: boolean
}
