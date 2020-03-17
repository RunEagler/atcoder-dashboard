import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { resourceExternalAPI } from '@/services/api/resoure.external-api';
import { Submission } from '@/models/external-api/submission';
import { ProblemDetail } from '@/models/external-api/problem-detail';
import { UserAC } from '@/models/external-api/user-ac';
import { UserPoint } from '@/models/external-api/user-point';
import { UserLanguage } from '@/models/external-api/user-language';
import { submissionStorage } from '@/services/storage/submission.storage';
import { userLanguageStorage } from '@/services/storage/user-language.storage';
import { userPointStorage } from '@/services/storage/user-point.storage';
import { userACStorage } from '@/services/storage/user-ac.storage';
import { problemDetailStorage } from '@/services/storage/problem-detail.storage';
import { ContestProblemPair } from '@/models/external-api/contest-problem-pair';
import { ExternalProblem } from '@/models/external-api/external-problem';

@Module({ dynamic: true, store, name: 'statisticsModule', namespaced: true })
class StatisticsModule extends VuexModule {
  submissions: Submission[] = [];
  problemDetails: ProblemDetail[] = [];
  userACs: UserAC[] = [];
  userPoints: UserPoint[] = [];
  userLanguages: UserLanguage[] = [];
  contestProblemPairs: ContestProblemPair[] = [];
  externalProblems: ExternalProblem[] = [];

  get frequencyByLanguage(): Map<string, number> {
    return this.userLanguages.reduce((result: Map<string, number>, userLanguage: UserLanguage) => {
      const freq: number = result.get(userLanguage.language) || 0;
      result.set(userLanguage.language, freq + 1);
      return result;
    }, new Map<string, number>());
  }

  get problemDetailByProblem(): Map<string, ProblemDetail> {
    return this.problemDetails.reduce((result: Map<string, ProblemDetail>, problemDetail: ProblemDetail) => {
      result.set(problemDetail.id, problemDetail);
      return result;
    }, new Map<string, ProblemDetail>());
  }

  get submissionsByDateString(): Map<string, Submission[]> {
    return this.submissions.reduce((result: Map<string, Submission[]>, submission: Submission) => {
      if (submission.result !== 'AC') {
        return result;
      }
      const dateString = new Date(submission.epochSecond * 1000).toLocaleDateString();
      const submissionsByDate: Submission[] = result.get(dateString) || [];
      submissionsByDate.push(submission);
      result.set(dateString, submissionsByDate);
      return result;
    }, new Map<string, Submission[]>());
  }

  get acByProblem(): Map<string, boolean> {
    return this.submissions.reduce((result: Map<string, boolean>, submission: Submission) => {
      if (!result.has(submission.problemID) && submission.result === 'AC') {
        result.set(submission.problemID, true);
      }
      return result;
    }, new Map<string, boolean>());
  }

  get acCountByLevelByContest(): Map<string, Map<string, number>> {
    const uniqueACSet: Set<string> = new Set<string>();

    const calcFreq = (result: Map<string, Map<string, number>>, submission: Submission, contestName: string) => {
      let level: string;
      const words: string[] = submission.problemID.split('_');
      switch (words[1]) {
        case '1':
          level = 'a';
          break;
        case '2':
          level = 'b';
          break;
        case '3':
          level = 'c';
          break;
        case '4':
          level = 'd';
          break;
        default:
          level = words[1];
      }
      const rankMap: Map<string, number> = result.get(contestName) || new Map<string, number>();
      const freq: number = rankMap.get(level) || 0;
      rankMap.set(level, submission.result === 'AC' ? freq + 1 : freq);
      result.set(contestName, rankMap);
    };
    return this.submissions.reduce((result: Map<string, Map<string, number>>, submission: Submission) => {
      if (uniqueACSet.has(submission.problemID)) {
        return result;
      }
      if (submission.contestID.match(/abc/)) {
        calcFreq(result, submission, 'abc');
      } else if (submission.contestID.match(/arc/)) {
        calcFreq(result, submission, 'arc');
      } else if (submission.contestID.match(/agc/)) {
        calcFreq(result, submission, 'agc');
      } else {
        const rankMap: Map<string, number> = result.get('other') || new Map<string, number>();
        const freq: number = rankMap.get('s') || 0;
        rankMap.set('s', submission.result === 'AC' ? freq + 1 : freq);
        result.set('other', rankMap);
      }

      uniqueACSet.add(submission.problemID);
      return result;
    }, new Map<string, Map<string, number>>());
  }

  get countByLevelByContest(): Map<string, Map<string, number>> {
    const calcFreq = (
      result: Map<string, Map<string, number>>,
      externalProblem: ExternalProblem,
      contestName: string,
    ) => {
      const words: string[] = externalProblem.problemID.split('_');
      let level: string;
      switch (words[1]) {
        case '1':
          level = 'a';
          break;
        case '2':
          level = 'b';
          break;
        case '3':
          level = 'c';
          break;
        case '4':
          level = 'd';
          break;
        default:
          level = words[1];
      }
      const rankMap: Map<string, number> = result.get(contestName) || new Map<string, number>();
      const freq: number = rankMap.get(level) || 0;
      rankMap.set(level, freq + 1);
      result.set(contestName, rankMap);
    };
    return this.externalProblems.reduce(
      (result: Map<string, Map<string, number>>, externalProblem: ExternalProblem) => {
        if (externalProblem.contestID.match(/abc/)) {
          calcFreq(result, externalProblem, 'abc');
        } else if (externalProblem.contestID.match(/arc/)) {
          calcFreq(result, externalProblem, 'arc');
        } else if (externalProblem.contestID.match(/agc/)) {
          calcFreq(result, externalProblem, 'agc');
        } else {
          const rankMap: Map<string, number> = result.get('other') || new Map<string, number>();
          const freq: number = rankMap.get('s') || 0;
          rankMap.set('s', freq + 1);
          result.set('other', rankMap);
        }
        return result;
      },
      new Map<string, Map<string, number>>(),
    );
  }

  @Mutation
  setSubmissions(v: Submission[]) {
    this.submissions = v;
  }

  @Mutation
  setProblemDetails(v: ProblemDetail[]) {
    this.problemDetails = v;
  }

  @Mutation
  setUserACs(v: UserAC[]) {
    this.userACs = v;
  }

  @Mutation
  setPoints(v: UserPoint[]) {
    this.userPoints = v;
  }

  @Mutation
  setUserLanguage(v: UserLanguage[]) {
    this.userLanguages = v;
  }

  @Mutation
  setContestProblemPairs(v: ContestProblemPair[]) {
    this.contestProblemPairs = v;
  }

  @Mutation
  setExternalProblems(v: ExternalProblem[]) {
    this.externalProblems = v;
  }

  @Action({ rawError: false })
  async fetchSubmissions(): Promise<Submission[]> {
    const result: Submission[] = await resourceExternalAPI.fetchSubmissions();
    this.setSubmissions(result);
    return result;
  }

  @Action({ rawError: false })
  async fetchProblemDetails() {
    const result: ProblemDetail[] = await resourceExternalAPI.fetchProblemDetails();
    this.setProblemDetails(result);
    return result;
  }

  @Action({ rawError: false })
  public async fetchAC(): Promise<UserAC[]> {
    const result: UserAC[] = await resourceExternalAPI.fetchAC();
    this.setUserACs(result);
    return result;
  }

  @Action({ rawError: false })
  public async fetchPoints(): Promise<UserPoint[]> {
    const result: UserPoint[] = await resourceExternalAPI.fetchPoints();
    this.setPoints(result);
    return result;
  }

  @Action({ rawError: false })
  public async fetchUserLanguage(): Promise<UserLanguage[]> {
    const result: UserLanguage[] = await resourceExternalAPI.fetchUserLanguage();
    this.setUserLanguage(result);
    return result;
  }

  @Action({ rawError: false })
  public async fetchExternalProblems(): Promise<ExternalProblem[]> {
    const result: ExternalProblem[] = await resourceExternalAPI.fetchExternalProblems();
    this.setExternalProblems(result);
    return result;
  }
}

export const statisticsModule = getModule(StatisticsModule);
