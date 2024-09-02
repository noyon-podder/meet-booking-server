import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingIntoDB(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot Create Successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  })
})

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getMyBookingsFromDB(req.user)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My bookings retrieved successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const bookingData = req.body

  const result = await BookingServices.updateBookingFromDB(id, bookingData)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking Update Successfully',
    data: result,
  })
})

// booking delete
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await BookingServices.bookingDeleteFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking Delete Successfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
  deleteBooking,
}
