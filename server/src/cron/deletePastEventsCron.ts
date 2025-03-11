import cron from 'node-cron';
import { deletePastEvents } from '../controllers/eventsController';
import { Request, Response, NextFunction } from 'express';

cron.schedule('30 3 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Running deletePastEvents cron job...`);
  
  try {
    await deletePastEvents(undefined as unknown as Request, undefined as unknown as Response, undefined as unknown as NextFunction);
    
    console.log(`[${new Date().toISOString()}] Past events deleted successfully.`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in deletePastEvents cron job:`, error);
  }
});
