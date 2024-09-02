import { z } from 'zod'

const registrationUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    phone: z.string().min(1, 'Phone Number is required'),
    address: z.string().min(1, 'Address is required'),
    role: z.enum(['user', 'admin']).default('user'),
  }),
})

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
})

export const AuthValidations = {
  registrationUserValidationSchema,
  loginUserValidationSchema,
}
