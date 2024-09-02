import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { RoomServices } from './room.service'

// create a room
const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoomIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Room Create Successfully',
    data: result,
  })
})

// get all rooms
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllRoomsFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Room Retrieve Successfully',
    data: result,
  })
})

// get all rooms
const getSingleRoom = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await RoomServices.getSingleRoomsFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Room retrieve Successfully',
    data: result,
  })
})

// ROOM delete
const roomDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await RoomServices.roomDeleteFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Room Delete Successfully',
    data: result,
  })
})

// ROOM UPDATE
const roomUpdate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const roomUpdatedData = req.body

  const result = await RoomServices.roomUpdateFromDB(id, roomUpdatedData)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Room Update Successfully',
    data: result,
  })
})

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  roomDelete,
  roomUpdate,
}
