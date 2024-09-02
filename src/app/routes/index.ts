import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { RoomRoutes } from '../modules/Room/room.route'
import { SlotRoutes } from '../modules/Slot/slot.route'
import { BookingRoutes } from '../modules/Booking/booking.route'

const MainRouter = express.Router()

const moduleRoutes = [
  { path: '/auth', routes: AuthRoutes },
  { path: '/user', routes: UserRoutes },
  { path: '/rooms', routes: RoomRoutes },
  { path: '/slots', routes: SlotRoutes },
  { path: '/', routes: BookingRoutes },
]

moduleRoutes.forEach((route) => MainRouter.use(route.path, route.routes))

export default MainRouter
