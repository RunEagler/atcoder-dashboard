import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Player } from '@/models/player';
import { playerApi } from '@/services/api/player.api';

@Module({ dynamic: true, store, name: 'playerModule', namespaced: true })
class PlayerModule extends VuexModule {
  contests: Player[] = [];

  @Mutation
  setPlayer(contests: Player[]) {
    this.contests = contests;
  }

  @Action
  async fetchPlayers() {
    const result = await playerApi.fetchPlayers();
    this.setPlayer(result);
  }
}

export const contestModule = getModule(PlayerModule);
