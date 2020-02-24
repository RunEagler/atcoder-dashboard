import { ApiService } from '@/services/api/api.service';
import { Answer } from '@/models/answer';

class AnswerApi extends ApiService {
  constructor() {
    super();
  }

  fetchAnswers(problemID: number): Promise<Answer[]> {
    return this.getList(Answer, `/problems/${problemID}/answers`, {});
  }
}

export const answerApi = new AnswerApi();
