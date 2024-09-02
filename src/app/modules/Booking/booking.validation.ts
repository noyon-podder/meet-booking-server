import { z } from 'zod'

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, 'Date is required'),
    slots: z.array(z.string().min(1, 'Slots is required')),
    room: z.string().min(1, 'Room Id is required'),
    user: z.string().min(1, 'user Id is required'),
    isConfirmed: z.enum(['Confirmed', 'unconfirmed']).default('unconfirmed'),
    totalAmount: z.number().default(0),
    isDeleted: z.boolean().default(false),
  }),
})

export const BookingValidation = {
  createBookingValidationSchema,
}
