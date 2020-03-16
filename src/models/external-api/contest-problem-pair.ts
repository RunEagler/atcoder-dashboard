import { Serializable } from '@/models/serializable';

export class ContestProblemPair implements Serializable<ContestProblemPair> {
  contestID: string;
  problemID: string;

  deserialize(input: any): ContestProblemPair {
    this.contestID = input.contest_id;
    this.problemID = input.problem_id;
    return this;
  }
}
