import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the document
interface IUserApiLimit extends Document {
  userId: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema with proper TypeScript typing
const userApiLimitSchema: Schema<IUserApiLimit> = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update `updatedAt`
userApiLimitSchema.pre<IUserApiLimit>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Pre-update hook to update `updatedAt`
userApiLimitSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as { [key: string]: any }; // Cast to a plain object with any values
  if (update) {
    update.updatedAt = new Date();
    this.setUpdate(update);
  }
  next();
});

// Create the model
const UserApiLimit = mongoose.models?.UserApiLimit || mongoose.model<IUserApiLimit>('UserApiLimit', userApiLimitSchema);

export default UserApiLimit;
