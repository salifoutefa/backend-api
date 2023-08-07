import { Request, Response } from 'express';
import { ProjectModel, IProject } from '../models/project.model';

export async function createProject(req: Request, res: Response) {
  try {
    const projectData: IProject = req.body;
    const newProject = await ProjectModel.create(projectData);
    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await ProjectModel.find();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    return res.status(500).json({ error: 'Failed to get projects' });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const projectId = req.params.projectId;
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error('Error getting project by ID:', error);
    return res.status(500).json({ error: 'Failed to get project' });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const projectId = req.params.projectId;
    const projectData: IProject = req.body;
    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, projectData, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'Failed to update project' });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const projectId = req.params.projectId;
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json(deletedProject);
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
}
