import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { SlotServices } from './slot.service'
import sendResponse from '../../utils/sendResponse'

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.createSlotIntoDB(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot Create Successfully',
    data: result,
  })
})

const getAllAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAllAvailableSlotsFromDB(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Available Slots Retrieve Successfully',
    data: result,
  })
})

// slot delete
const slotDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await SlotServices.slotDeleteFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot Delete Successfully',
    data: result,
  })
})

export const SlotControllers = {
  createSlot,
  getAllAvailableSlots,
  slotDelete,
}
