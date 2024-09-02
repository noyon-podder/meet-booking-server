import { Router } from 'express'
import { SlotControllers } from './slot.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import validateRequest from '../../middleware/validateRequest'
import { SlotValidations } from './slot.validation'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
)

router.get('/availability', SlotControllers.getAllAvailableSlots)

router.delete('/:id', auth(USER_ROLE.admin), SlotControllers.slotDelete)

export const SlotRoutes = router
