// middlewares/index.ts
import express from 'express';
import { merge, get } from 'lodash';

import { Request, Response, NextFunction } from 'express';
import { getUserBySessionToken } from 'models/user.model';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['SC-BACKEND-API-AUTH'];
    
        if (!sessionToken) {
          return res.sendStatus(403);
        }
    
        const existingUser = await getUserBySessionToken(sessionToken);
    
        if (!existingUser) {
          return res.sendStatus(403);
        }
    
        merge(req, { identity: existingUser });
    
        return next();
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
