import { Submission } from '@/models/external-api/submission';
import { ExternalApiService } from '@/services/api/external-api.service';
import { ProblemDetail } from '@/models/external-api/problem-detail';
import { UserAC } from '@/models/external-api/user-ac';
import { UserPoint } from '@/models/external-api/user-point';
import { UserLanguage } from '@/models/external-api/user-language';
import { ContestProblemPair } from '@/models/external-api/contest-problem-pair';
import { ExternalProblem } from '@/models/external-api/external-problem';

class ResoureExternalAPI extends ExternalApiService {
  constructor() {
    super();
  }

  public fetchSubmissions(): Promise<Submission[]> {
    return this.getList(Submission, `/atcoder-api/results?user=RunEagler`, {});
  }

  public fetchProblemDetails(): Promise<ProblemDetail[]> {
    return this.getList(ProblemDetail, `/resources/merged-problems.json`, {});
  }

  public fetchAC(): Promise<UserAC[]> {
    return this.getList(UserAC, `/resources/ac.json`, {});
  }

  public fetchPoints(): Promise<UserPoint[]> {
    return this.getList(UserPoint, `/resources/sums.json`, {});
  }

  public fetchUserLanguage(): Promise<UserLanguage[]> {
    return this.getList(UserLanguage, `/resources/lang.json`, {});
  }

  public fetchExternalProblems(): Promise<ExternalProblem[]> {
    return this.getList(ExternalProblem, `/resources/problems.json`, {});
  }
}

export const resourceExternalAPI = new ResoureExternalAPI();
