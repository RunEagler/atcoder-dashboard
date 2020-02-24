import { Mutation, VuexModule, Action, Module, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { Answer } from '@/models/answer';
import { answerApi } from '@/services/api/answer.api';

@Module({ dynamic: true, store, name: 'answerModule', namespaced: true })
class AnswerModule extends VuexModule {
  answers: Answer[] = [];

  setAnswers(answers: Answer[]) {
    this.answers = answers;
  }

  @Action
  async fetchAnswers(problemID: number) {
    const result = await answerApi.fetchAnswers(problemID);
    this.setAnswers(result);
  }
}

export const answerModule = getModule(AnswerModule);
