import { ApiService } from '@/services/api/api.service';
import { Level } from '@/models/level';

class LevelApi extends ApiService {
  constructor() {
    super();
  }

  fetchLevels(): Promise<Level[]> {
    return this.getList(Level, `/levels`, {});
  }
}

export const levelApi = new LevelApi();
