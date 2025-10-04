// server/src/controllers/SportsDBController.ts
import { Request, Response } from 'express';
import { sportsDBService } from '../services/SportsDBService';

export class SportsDBController {
  getLeagues = async (req: Request, res: Response) => {
    try {
      const { country } = req.query;
      let leagues;
      
      if (country) {
        leagues = await sportsDBService.getLeaguesByCountry(country as string);
      } else {
        leagues = await sportsDBService.getAllLeagues();
      }
      
      res.json({ success: true, data: leagues });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch leagues' });
    }
  };

  getTeamsByLeague = async (req: Request, res: Response) => {
    try {
      const { leagueName } = req.params;
      const teams = await sportsDBService.getTeamsByLeague(leagueName);
      res.json({ success: true, data: teams });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch teams' });
    }
  };

  getPlayersByTeam = async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      const players = await sportsDBService.getPlayersByTeam(teamId);
      res.json({ success: true, data: players });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch players' });
    }
  };

  searchPlayers = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const players = await sportsDBService.searchPlayers(name);
      res.json({ success: true, data: players });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to search players' });
    }
  };

  getPlayerById = async (req: Request, res: Response) => {
    try {
      const { playerId } = req.params;
      const player = await sportsDBService.getPlayerById(playerId);
      res.json({ success: true, data: player });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch player' });
    }
  };

  getMatches = async (req: Request, res: Response) => {
    try {
      const { leagueId } = req.params;
      const matches = await sportsDBService.getEventsByLeague(leagueId);
      res.json({ success: true, data: matches });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch matches' });
    }
  };
}