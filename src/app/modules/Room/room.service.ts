import AppError from '../../errors/AppError'
import { TRoom } from './room.interface'
import { Room } from './room.model'

// create a new room
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload)
  return result
}

// get all rooms
const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const { searchTerm, capacity, minPrice, maxPrice, sort } = query

  const filter: any = {}

  // search product into name and brand
  if (searchTerm) {
    filter.name = { $regex: searchTerm, $options: 'i' }
  }

  // Filter by capacity
  if (capacity) {
    filter.capacity = { $gte: Number(capacity) } // Greater than or equal to capacity
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    filter.pricePerSlot = {}
    if (minPrice) filter.pricePerSlot.$gte = Number(minPrice)
    if (maxPrice) filter.pricePerSlot.$lte = Number(maxPrice)
  }

  // Determine sort order
  let sortOptions: any = { createdAt: -1 } // Default to most recent first
  if (sort === 'priceAsc') {
    sortOptions = { pricePerSlot: 1 }
  } else if (sort === 'priceDesc') {
    sortOptions = { pricePerSlot: -1 }
  } else if (sort === 'newest') {
    sortOptions = { createdAt: -1 }
  } else if (sort === 'oldest') {
    sortOptions = { createdAt: 1 }
  }
  // Query the database
  const result = await Room.find(filter).sort(sortOptions)
  return result
}

// get all rooms
const getSingleRoomsFromDB = async (id: string) => {
  const isRoomExist = await Room.findOne({ _id: id })

  if (!isRoomExist) {
    throw new AppError(404, 'Room Not Found')
  }
  return isRoomExist
}

// room delete from db
const roomDeleteFromDB = async (id: string) => {
  const result = await Room.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  )

  if (!result) {
    throw new AppError(404, 'Room Not Found')
  }

  return result
}

// room update from db
const roomUpdateFromDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomsFromDB,
  roomDeleteFromDB,
  roomUpdateFromDB,
}
