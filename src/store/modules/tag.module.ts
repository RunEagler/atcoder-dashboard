import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Tag } from '@/models/tag';
import { tagApi } from '@/services/api/tag.api';

@Module({ dynamic: true, store, name: 'tagModule', namespaced: true })
class TagModule extends VuexModule {
  tags: Tag[] = [];

  get findTag() {
    return (tagID: number): Tag => {
      return this.tags.find((tag: Tag) => tag.id === tagID) || new Tag();
    };
  }

  @Mutation
  setTags(tags: Tag[]) {
    this.tags = tags;
  }

  @Action
  async addTag(tag: Tag): Promise<Tag> {
    return await tagApi.addTag(tag);
  }

  @Action
  async fetchTags() {
    const result = await tagApi.fetchTags();
    this.setTags(result);
  }
}

export const tagModule = getModule(TagModule);
