import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Serializable } from '@/models/serializable';

export class Empty implements Serializable<Empty> {
  deserialize(input: any): Empty {
    return input;
  }
}
