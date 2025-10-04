// server/src/services/SportsDBService.ts
import axios from 'axios';

class SportsDBService {
  private baseURL = 'https://www.thesportsdb.com/api/v1/json/3';

  private async makeRequest(endpoint: string) {
    try {
      console.log(`🔗 Calling The Sports DB: ${endpoint}`);
      
      const response = await axios.get(`${this.baseURL}${endpoint}`);
      
      console.log(`✅ The Sports DB success: ${endpoint}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ The Sports DB error:', error.message);
      throw new Error('Failed to fetch data from The Sports DB');
    }
  }

  // Lấy tất cả giải đấu
  async getAllLeagues() {
    return this.makeRequest('/all_leagues.php');
  }

  // Lấy giải đấu theo country
  async getLeaguesByCountry(country: string) {
    return this.makeRequest(`/search_all_leagues.php?c=${country}&s=Soccer`);
  }

  // Lấy teams theo giải đấu
  async getTeamsByLeague(leagueName: string) {
    return this.makeRequest(`/search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
  }

  // Lấy thông tin team cụ thể
  async getTeamById(teamId: string) {
    return this.makeRequest(`/lookupteam.php?id=${teamId}`);
  }

  // Lấy players của team
  async getPlayersByTeam(teamId: string) {
    return this.makeRequest(`/lookup_all_players.php?id=${teamId}`);
  }

  // Tìm kiếm players
  async searchPlayers(name: string) {
    return this.makeRequest(`/searchplayers.php?p=${encodeURIComponent(name)}`);
  }

  // Lấy events (matches) theo league
  async getEventsByLeague(leagueId: string) {
    return this.makeRequest(`/eventsseason.php?id=${leagueId}`);
  }

  // Lấy thông tin player cụ thể
  async getPlayerById(playerId: string) {
    return this.makeRequest(`/lookupplayer.php?id=${playerId}`);
  }
}

export const sportsDBService = new SportsDBService();