import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  saltRounds: process.env.SALT_Rounds,
  jwt_secret: process.env.JWT_SECRET_KEY,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
}
