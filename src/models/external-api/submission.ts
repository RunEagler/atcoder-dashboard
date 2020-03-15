import { Serializable } from '@/models/serializable';

export class Submission implements Serializable<Submission> {
  id: number;
  epochSecond: number;
  problemID: string;
  contestID: string;
  userID: string;
  language: string;
  point: number;
  length: number;
  result: string;
  executionTime: number;

  deserialize(input: any): Submission {
    this.id = input.id;
    this.epochSecond = input.epoch_second;
    this.problemID = input.problem_id;
    this.contestID = input.contest_id;
    this.userID = input.user_id;
    this.language = input.language;
    this.point = input.point;
    this.length = input.length;
    this.result = input.result;
    this.executionTime = input.execution_time;

    return this;
  }
}
