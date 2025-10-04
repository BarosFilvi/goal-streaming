// server/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

// Import API Football routes
import sportsDBRoutes from './routes/sportsDB';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes - CHỈ SỬ DỤNG API FOOTBALL
app.use('/api/football', sportsDBRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'GoalStream API with Real Football Data',
    version: '1.0.0',
    endpoints: {
      leagues: '/api/football/leagues',
      teams: '/api/football/league/:leagueId/teams',
      players: '/api/football/teams/:teamId/players',
      search: '/api/football/players/search/:name',
      fixtures: '/api/football/fixtures/:leagueId'
    }
  });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Football API: http://localhost:${PORT}/api/football`);
  console.log(`Using REAL API-Football data`);
});