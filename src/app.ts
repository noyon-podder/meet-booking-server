import express, { Response, Request, Application } from 'express'
import cors from 'cors'
import MainRouter from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFoundRoute from './app/middleware/notFoundRoute'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

// whole project router call here
app.use('/api', MainRouter)

// check routing
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Developer!!',
  })
})

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFoundRoute)
export default app
