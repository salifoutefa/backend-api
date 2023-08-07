import { Schema, model, Document } from 'mongoose';
import { IProject } from './project.model';
import { IQuotation } from './quotation.model';

export interface ITask extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  project: IProject['_id'];
  quotation?: IQuotation['_id'];
}

const TaskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  quotation: { type: Schema.Types.ObjectId, ref: 'Quotation' },
});

export const TaskModel = model<ITask>('Task', TaskSchema);
