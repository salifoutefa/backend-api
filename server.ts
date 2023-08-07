// ... (Existing code)

// Import necessary packages
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import authRouter from './routes/auth.router';
import projectsRouter from './routes/projects.router';
import tasksRouter from './routes/tasks.router';

// ... (Existing code)

// Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Mount routers
app.use('/auth', authRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
