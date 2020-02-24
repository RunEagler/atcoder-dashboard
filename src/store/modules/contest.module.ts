import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Contest } from '@/models/contest';
import { contestApi } from '@/services/api/contest.api';

@Module({ dynamic: true, store, name: 'contestModule', namespaced: true })
class ContestModule extends VuexModule {
  contests: Contest[] = [];

  get contest() {
    return (contestID: number): Contest => {
      return this.contests.find((contest: Contest) => contest.id === contestID) || new Contest();
    };
  }

  @Mutation
  setContests(contests: Contest[]) {
    this.contests = contests;
  }

  @Action({ rawError: false })
  async fetchContests() {
    const result = await contestApi.fetchContests();
    this.setContests(result);
  }
}

export const contestModule = getModule(ContestModule);
