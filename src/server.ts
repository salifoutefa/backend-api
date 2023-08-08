// server.ts

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { MONGO_URL, FIREBASE_CONFIG } from './config'; // Import the config

import authRouter from './routes/auth.router';
import projectsRouter from './routes/projects.router';
import tasksRouter from './routes/tasks.router';
// Import other routers as needed

// Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Initialize Firebase with the provided config
firebase.initializeApp(FIREBASE_CONFIG);

// Mount routers
app.use('/auth', authRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
// Use other routers as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
