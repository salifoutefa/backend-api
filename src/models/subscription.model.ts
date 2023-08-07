import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IPackage } from './package.model';

export interface ISubscription extends Document {
  user: IUser['_id'];
  package: IPackage['_id'];
  startDate: Date;
  endDate: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const SubscriptionModel = model<ISubscription>('Subscription', SubscriptionSchema);