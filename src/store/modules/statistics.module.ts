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

@Module({ dynamic: true, store, name: 'statisticsModule', namespaced: true })
class StatisticsModule extends VuexModule {
  submissions: Submission[] = [];
  problemDetails: ProblemDetail[] = [];
  userACs: UserAC[] = [];
  userPoints: UserPoint[] = [];
  userLanguages: UserLanguage[] = [];

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

  get acByProblem(): Map<string, boolean> {
    return this.submissions.reduce((result: Map<string, boolean>, submission: Submission) => {
      if (!result.has(submission.problemID) && submission.result === 'AC') {
        result.set(submission.problemID, true);
      }
      return result;
    }, new Map<string, boolean>());
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
}

export const statisticsModule = getModule(StatisticsModule);
