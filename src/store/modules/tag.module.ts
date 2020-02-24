import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Tag } from '@/models/tag';
import { tagApi } from '@/services/api/tag.api';

@Module({ dynamic: true, store, name: 'tagModule', namespaced: true })
class TagModule extends VuexModule {
  tags: Tag[] = [];

  @Mutation
  setTags(tags: Tag[]) {
    this.tags = tags;
  }

  @Action
  async fetchTags() {
    const result = await tagApi.fetchTags();
    this.setTags(result);
  }
}

export const tagModule = getModule(TagModule);
