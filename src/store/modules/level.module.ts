import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Level } from '@/models/level';
import { levelApi } from '@/services/api/level.api';

@Module({ dynamic: true, store, name: 'levelModule', namespaced: true })
class LevelModule extends VuexModule {
  levels: Level[] = [];

  @Mutation
  setLevel(levels: Level[]) {
    this.levels = levels;
  }

  @Action
  async fetchLevels() {
    const result = await levelApi.fetchLevels();
    this.setLevel(result);
  }
}

export const levelModule = getModule(LevelModule);
