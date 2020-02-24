import { ApiService } from '@/services/api/api.service';
import { Contest } from '@/models/contest';

class ContestApi extends ApiService {
  constructor() {
    super();
  }

  fetchContests(): Promise<Contest[]> {
    return this.getList(Contest, `/contests`, {});
  }
}

export const contestApi = new ContestApi();
