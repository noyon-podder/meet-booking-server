import { Types } from 'mongoose'
import { TSlot } from './slot.interface'
import { Slot } from './slot.model'
import AppError from '../../errors/AppError'
import { Room } from '../Room/room.model'

const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload

  const isRoomAvailable = await Room.findOne({ _id: room })

  if (!isRoomAvailable) {
    throw new AppError(404, 'Room Not Found')
  }

  const slotDuration = 60

  // convert start hour to minutes
  const startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1])

  // convert start hour to minutes
  const endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]) * 60

  const totalDuration = endMinutes - startMinutes

  const numberOfSlots = totalDuration / slotDuration

  // slots are added in this array
  const slots = []

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = startMinutes + i * slotDuration
    const slotEndTime = slotStartTime + slotDuration

    const slot = {
      room,
      date,
      startTime: `${Math.floor(slotStartTime / 60)
        .toString()
        .padStart(2, '0')}:${(slotStartTime % 60).toString().padStart(2, '0')}`,
      endTime: `${Math.floor(slotEndTime / 60)
        .toString()
        .padStart(2, '0')}:${(slotEndTime % 60).toString().padStart(2, '0')}`,
    }
    slots.push(slot)
  }

  const result = await Slot.create(slots)

  return result
}

// get all available slots
const getAllAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query

  let findQuery: Partial<TSlot> = { isBooked: false }

  if (date) {
    findQuery = { ...findQuery, date: date as string }
  }

  if (roomId) {
    findQuery = { ...findQuery, room: roomId as Types.ObjectId }
  }

  const result = await Slot.find(findQuery)
    .populate('room')
    .sort({ createdAt: -1 })
    .exec()

  return result
}

// get all slots to see only admin
const getAllSlotsFromDB = async () => {
  const result = await Slot.find()
    .populate('room')
    .sort({ createdAt: -1 })
    .exec()
  return result
}

// slot delete from db
const slotDeleteFromDB = async (id: string) => {
  const result = await Slot.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  )
  if (!result) {
    throw new AppError(404, 'Slot Not Found')
  }

  return result
}

// slot update from db
const slotUpdateFromDB = async (id: string, payload: Partial<TSlot>) => {
  const { room, startTime, date, endTime } = payload

  if (startTime! >= endTime!) {
    throw new Error('Start time must be earlier than end time.')
  }
  // 1. Find conflicting slots in the same room and date
  const conflictingSlot = await Slot.findOne({
    room: room,
    date: date,
    _id: { $ne: id },
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
    isDeleted: false,
  })

  // 2. If a conflicting slot exists, return error
  if (conflictingSlot) {
    throw new AppError(403, 'Start time must be earlier than end time.')
  }

  // 3. If no conflict, update the slot
  const updatedSlot = await Slot.findByIdAndUpdate(
    id,
    {
      room,
      date,
      startTime,
      endTime,
    },
    { new: true }, // Return the updated document
  )

  return updatedSlot
}

export const SlotServices = {
  createSlotIntoDB,
  getAllAvailableSlotsFromDB,
  slotDeleteFromDB,
  slotUpdateFromDB,
  getAllSlotsFromDB,
}
