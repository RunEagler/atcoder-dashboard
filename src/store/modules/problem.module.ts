import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Problem } from '@/models/problem';
import { problemApi } from '@/services/api/problem.api';
import { Pagination } from '@/models/pagination';

@Module({ dynamic: true, store, name: 'problemModule', namespaced: true })
class ProblemModule extends VuexModule {
  problemsPerPage: Pagination<Problem> = new Pagination<Problem>();

  @Mutation
  setProblems(problems: Pagination<Problem>) {
    this.problemsPerPage = problems;
  }

  @Action
  async fetchProblems(contestID: number) {
    const result = await problemApi.fetchProblems(contestID);
    this.setProblems(result);
  }
}

export const problemModule = getModule(ProblemModule);
