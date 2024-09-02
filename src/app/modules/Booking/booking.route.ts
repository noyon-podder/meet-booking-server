import { Router } from 'express'
import { BookingControllers } from './booking.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import validateRequest from '../../middleware/validateRequest'
import { BookingValidation } from './booking.validation'

const router = Router()

router.post(
  '/bookings',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
)

router.get(
  '/bookings',
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookings,
)

router.get(
  '/my-bookings',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BookingControllers.getMyBookings,
)

router.put(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingControllers.updateBooking,
)

router.delete(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingControllers.deleteBooking,
)
export const BookingRoutes = router
