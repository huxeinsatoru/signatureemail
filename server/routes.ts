import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create health check endpoint
  app.get('/api/health', (_, res) => {
    res.json({ status: 'up' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
