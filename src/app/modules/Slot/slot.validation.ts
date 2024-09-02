import { z } from 'zod'

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string().min(1, 'Room Id is required'),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
  }),
})

export const SlotValidations = {
  createSlotValidationSchema,
}
