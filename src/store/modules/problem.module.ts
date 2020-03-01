import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Problem } from '@/models/problem';
import { problemApi } from '@/services/api/problem.api';
import { Pagination } from '@/models/pagination';
import { FetchProblems } from '@/models/request/fetch-problems';
import { UpdateProblem } from '@/models/request/update-problem';

@Module({ dynamic: true, store, name: 'problemModule', namespaced: true })
class ProblemModule extends VuexModule {
  problemsPerPage: Pagination<Problem> = new Pagination<Problem>();

  @Mutation
  setProblems(problems: Pagination<Problem>) {
    this.problemsPerPage = problems;
  }

  @Action
  async updateTagProblem(request: UpdateProblem) {
    await problemApi.updateTagProblem(request.problemID, request.tags);
  }

  @Action
  async fetchProblems(fetchProblems: FetchProblems) {
    const result = await problemApi.fetchProblems(fetchProblems);
    this.setProblems(result);
  }
}

export const problemModule = getModule(ProblemModule);
