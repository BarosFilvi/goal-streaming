import { Player, Team, Match, Standing } from '../types';

// Mock data giống như từ API thật
const mockPlayers: Player[] = [
  {
    id: 276,
    name: "C. Ronaldo",
    firstname: "Cristiano",
    lastname: "Ronaldo dos Santos Aveiro",
    age: 38,
    birth: {
      date: "1985-02-05",
      place: "Funchal",
      country: "Portugal"
    },
    nationality: "Portugal",
    height: "187 cm",
    weight: "85 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/276.png"
  },
  {
    id: 154,
    name: "L. Messi",
    firstname: "Lionel",
    lastname: "Messi",
    age: 36,
    birth: {
      date: "1987-06-24",
      place: "Rosario",
      country: "Argentina"
    },
    nationality: "Argentina",
    height: "170 cm",
    weight: "72 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/154.png"
  },
  {
    id: 1100,
    name: "K. De Bruyne",
    firstname: "Kevin",
    lastname: "De Bruyne",
    age: 32,
    birth: {
      date: "1991-06-28",
      place: "Drongen",
      country: "Belgium"
    },
    nationality: "Belgium",
    height: "181 cm",
    weight: "70 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/1100.png"
  }
];

const mockTeams: Team[] = [
  {
    id: 33,
    name: "Manchester United",
    code: "MUN",
    country: "England",
    founded: 1878,
    national: false,
    logo: "https://media.api-sports.io/football/teams/33.png"
  },
  {
    id: 40,
    name: "Liverpool",
    code: "LIV",
    country: "England",
    founded: 1892,
    national: false,
    logo: "https://media.api-sports.io/football/teams/40.png"
  },
  {
    id: 50,
    name: "Manchester City",
    code: "MAC",
    country: "England",
    founded: 1880,
    national: false,
    logo: "https://media.api-sports.io/football/teams/50.png"
  }
];

const mockMatches: Match[] = [
  {
    fixture: {
      id: 867946,
      referee: "M. Oliver",
      timezone: "UTC",
      date: "2024-01-14T16:30:00+00:00",
      timestamp: 1705247400,
      periods: {
        first: 1705246200,
        second: 1705249800
      },
      venue: {
        id: 556,
        name: "Old Trafford",
        city: "Manchester"
      },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90
      }
    },
    league: {
      id: 39,
      name: "Premier League",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/39.png"
    },
    teams: {
      home: mockTeams[0], // Man United
      away: mockTeams[1]  // Liverpool
    },
    goals: {
      home: 2,
      away: 2
    },
    score: {
      halftime: {
        home: 1,
        away: 1
      },
      fulltime: {
        home: 2,
        away: 2
      },
      extratime: {
        home: 0,
        away: 0 
      },
      penalty: {
        home: 0,
        away: 0 
      }
    }
  },
  {
    fixture: {
      id: 867947,
      referee: "A. Taylor",
      timezone: "UTC",
      date: "2024-01-15T19:45:00+00:00",
      timestamp: 1705340700,
      periods: {
        first: 1705339500,
        second: 1705343100
      },
      venue: {
        id: 555,
        name: "Etihad Stadium",
        city: "Manchester"
      },
      status: {
        long: "Not Started",
        short: "NS",
        elapsed: null
      }
    },
    league: {
      id: 39,
      name: "Premier League",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/39.png"
    },
    teams: {
      home: mockTeams[2], // Man City
      away: mockTeams[0]  // Man United
    },
    goals: {
      home: null,  // Trận chưa diễn ra nên là null
      away: null
    },
    score: {
      halftime: {
        home: null,
        away: null
      },
      fulltime: {
        home: null,
        away: null
      },
      extratime: {
        home: null,
        away: null
      },
      penalty: {
        home: null,
        away: null
      }
    }
  }
];

export class MockDataService {
  // Lấy tất cả cầu thủ
  async getAllPlayers(): Promise<Player[]> {
    // Giả lập delay như API thật
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlayers;
  }

  // Lấy cầu thủ theo ID
  async getPlayerById(playerId: number): Promise<Player | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const player = mockPlayers.find(p => p.id === playerId);
    return player || null;
  }

  // Lấy cầu thủ theo đội
  async getPlayersByTeam(teamId: number): Promise<Player[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    // Trong mock data, giả sử tất cả cầu thủ thuộc team đầu tiên
    return mockPlayers;
  }

  // Tìm kiếm cầu thủ
  async searchPlayers(query: string): Promise<Player[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPlayers.filter(player => 
      player.name.toLowerCase().includes(query.toLowerCase()) ||
      player.firstname.toLowerCase().includes(query.toLowerCase()) ||
      player.lastname.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Lấy tất cả đội bóng
  async getAllTeams(): Promise<Team[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTeams;
  }

  // Lấy đội bóng theo ID
  async getTeamById(teamId: number): Promise<Team | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const team = mockTeams.find(t => t.id === teamId);
    return team || null;
  }

  // Lấy trận đấu
  async getMatches(): Promise<Match[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockMatches;
  }
}

export const mockDataService = new MockDataService();