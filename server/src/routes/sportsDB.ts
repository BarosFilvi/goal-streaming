// server/src/routes/sportsDB.ts
import { Router } from 'express';
import { SportsDBController } from '../controllers/SportsDBController';

const router = Router();
const controller = new SportsDBController();

router.get('/leagues', controller.getLeagues);
router.get('/league/:leagueName/teams', controller.getTeamsByLeague);
router.get('/teams/:teamId/players', controller.getPlayersByTeam);
router.get('/players/search/:name', controller.searchPlayers);
router.get('/players/:playerId', controller.getPlayerById);
router.get('/matches/:leagueId', controller.getMatches);

export default router;