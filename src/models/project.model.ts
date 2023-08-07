import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IProject extends Document {
  name: string;
  location: string;
  description: string;
  status: string;
  owner: IUser['_id'];
  tasks: Array<ITask['_id']>;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export const ProjectModel = model<IProject>('Project', ProjectSchema);