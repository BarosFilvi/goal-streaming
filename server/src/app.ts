import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { query } from './config/database';
import { mockDataService } from './services/mockDataService';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Goal Streaming API is running!',
    timestamp: new Date().toISOString(),
    dataSource: 'MOCK DATA (Waiting for API approval)'
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW() as current_time');
    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      time: result.rows[0].current_time
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error 
    });
  }
});

// API Routes với mock data
app.get('/api/players', async (req, res) => {
  try {
    const players = await mockDataService.getAllPlayers();
    res.json({ 
      success: true, 
      data: players,
      total: players.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch players' 
    });
  }
});

app.get('/api/players/:id', async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const player = await mockDataService.getPlayerById(playerId);
    
    if (!player) {
      res.status(404).json({ 
        success: false, 
        error: 'Player not found' 
      });
      return;
    }
    
    res.json({ 
      success: true, 
      data: player 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch player' 
    });
  }
});

app.get('/api/players/team/:teamId', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const players = await mockDataService.getPlayersByTeam(teamId);
    
    res.json({ 
      success: true, 
      data: players,
      total: players.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch team players' 
    });
  }
});

app.get('/api/teams', async (req, res) => {
  try {
    const teams = await mockDataService.getAllTeams();
    res.json({ 
      success: true, 
      data: teams,
      total: teams.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch teams' 
    });
  }
});

app.get('/api/matches', async (req, res) => {
  try {
    const matches = await mockDataService.getMatches();
    res.json({ 
      success: true, 
      data: matches,
      total: matches.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch matches' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Players API: http://localhost:${PORT}/api/players`);
  console.log(`🏟️ Teams API: http://localhost:${PORT}/api/teams`);
  console.log(`⚽ Matches API: http://localhost:${PORT}/api/matches`);
});