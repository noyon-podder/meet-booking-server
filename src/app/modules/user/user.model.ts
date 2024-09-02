import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.isDeleted
        return ret
      },
    },
  },
)

// Pre middleware to exclude documents where isDeleted is true
userSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: true } })
})

userSchema.pre('findOne', function () {
  this.where({ isDeleted: { $ne: true } })
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds))

  next()
})

export const User = model<TUser>('User', userSchema)
