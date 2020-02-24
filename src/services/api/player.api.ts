import { ApiService } from '@/services/api/api.service';
import { Player } from '@/models/player';

class PlayerApi extends ApiService {
  constructor() {
    super();
  }

  fetchPlayers(): Promise<Player[]> {
    return this.getList(Player, `/players`, {});
  }
}

export const playerApi = new PlayerApi();
