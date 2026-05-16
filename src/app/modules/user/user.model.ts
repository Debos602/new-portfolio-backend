import { Schema, model } from 'mongoose';

import { TUser } from './user.interface';

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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: false,
    },
    drivingLicense: {
      type: String,
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);



export const UserModel = model<TUser>('User', userSchema);
