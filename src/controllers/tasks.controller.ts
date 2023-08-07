import { Request, Response } from 'express';
import { TaskModel, ITask } from '../models/task.model';

export async function createTask(req: Request, res: Response) {
  try {
    const taskData: ITask = req.body;
    const newTask = await TaskModel.create(taskData);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await TaskModel.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    return res.status(500).json({ error: 'Failed to get tasks' });
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const taskId = req.params.taskId;
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return res.status(500).json({ error: 'Failed to get task' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const taskId = req.params.taskId;
    const taskData: ITask = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, taskData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
}
