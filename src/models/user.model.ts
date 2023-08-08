import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  status?: string;
  profile: 'promoter' | 'technician' | 'supplier' | 'admin';
  email?: string;
}

const UserSchema = new Schema<IUser>({
  phoneNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  status: { type: String },
  profile: { type: String, enum: ['promoter', 'technician', 'supplier', 'admin'], required: true },
  email: { type: String },
});

export const UserModel = model<IUser>('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByPhoneNumber = (phoneNumber: string) => UserModel.findOne({ phoneNumber });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);