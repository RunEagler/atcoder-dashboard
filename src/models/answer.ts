import { Serializable } from '@/models/serializable';

export class Answer implements Serializable<Answer> {
  id: number;
  playerID: number;
  problemID: number;
  code: string;
  proposalDatetime: Date;
  codeLength: number;
  executionTime: number;
  memory: number;

  deserialize(input: any): Answer {
    this.id = input.id;
    this.playerID = input.player_id;
    this.problemID = input.problem_id;
    this.code = input.code;
    this.proposalDatetime = input.proposal_datetime;
    this.codeLength = input.code_length;
    this.executionTime = input.execution_time;
    this.memory = input.memory;

    return this;
  }
}
