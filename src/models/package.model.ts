import { Schema, model, Document } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  price: number;
  banner: string;
  description: string;
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  banner: { type: String, required: true },
  description: { type: String, required: true },
});

export const PackageModel = model<IPackage>('Package', PackageSchema);