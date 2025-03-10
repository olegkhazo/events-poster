import cron from 'node-cron';

import { deletePastEvents } from "../../src/controllers/eventsController";

cron.schedule("30 3 * * *", async () => {
    console.log("Running deletePastEvents cron job...");
    try {
      await deletePastEvents();
      console.log("Past events deleted successfully.");
    } catch (error) {
      console.error("Error in deletePastEvents cron job:", error);
    }
  });
