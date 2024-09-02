/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

type TSendResponse = {
  statusCode: number
  message: string
  success: boolean
  token?: string
  data: any
}

const sendResponse = (res: Response, data: TSendResponse) => {
  const responseObject: TSendResponse = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  }
  if (data.token) {
    responseObject.token = data.token
  }
  return res.status(data.statusCode).json(responseObject)
}

export default sendResponse
