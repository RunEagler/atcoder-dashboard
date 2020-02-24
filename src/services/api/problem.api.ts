import { ApiService } from '@/services/api/api.service';
import { Problem } from '@/models/problem';
import { Pagination } from '@/models/pagination';

class ProblemApi extends ApiService {
  constructor() {
    super();
  }

  fetchProblems(contestID: number): Promise<Pagination<Problem>> {
    return this.getPagingData(Problem, `/contests/${contestID}/problems`, {});
  }
}

export const problemApi = new ProblemApi();
