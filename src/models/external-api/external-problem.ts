import { Serializable } from '@/models/serializable';

export class ExternalProblem implements Serializable<ExternalProblem> {
  problemID: string;
  contestID: string;
  title: string;

  deserialize(input: any): ExternalProblem {
    this.contestID = input.contest_id;
    this.problemID = input.id;
    this.title = input.title;
    return this;
  }
}
