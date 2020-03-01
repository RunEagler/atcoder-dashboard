import { ApiService } from '@/services/api/api.service';
import { Problem } from '@/models/problem';
import { Pagination } from '@/models/pagination';
import { FetchProblems } from '@/models/request/fetch-problems';
import { Tag } from '@/models/tag';
import { Empty } from '@/models/empty';

class ProblemApi extends ApiService {
  constructor() {
    super();
  }

  updateTagProblem(problemID: number, tags: Tag[]): Promise<Empty> {
    return this.put(Empty, `/problems/${problemID}`, { tags });
  }

  fetchProblems(fetchProblems: FetchProblems): Promise<Pagination<Problem>> {
    return this.getPagingData(Problem, `/contests/${fetchProblems.contestID}/problems`, {
      page: fetchProblems.page,
      level_id: fetchProblems.levelID,
    });
  }
}

export const problemApi = new ProblemApi();
