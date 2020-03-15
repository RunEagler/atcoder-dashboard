import { Serializable } from '@/models/serializable';

export class ProblemDetail implements Serializable<ProblemDetail> {
  id: string;
  contestID: string;
  title: string;
  shortestSubmissionID: number;
  shortestProblemID: string;
  shortestContestID: string;
  shortestUserID: string;
  fastestSubmissionID: number;
  fastestProblemID: string;
  fastestContestID: string;
  fastestUserID: string;
  firstSubmissionID: number;
  firstProblemID: string;
  firstContestID: string;
  firstUserID: string;
  sourceCodeLength: number;
  executionTime: number;
  point: number;
  predict: number;
  solverCount: number;

  deserialize(input: any): ProblemDetail {
    this.id = input.id;
    this.contestID = input.contest_id;
    this.title = input.title;
    this.shortestSubmissionID = this.shortestSubmissionID;
    this.shortestProblemID = input.shortest_problem_id;
    this.shortestContestID = input.shortest_contest_id;
    this.shortestUserID = input.shortest_user_id;
    this.fastestSubmissionID = input.fastest_submission_id;
    this.fastestProblemID = input.fastest_problem_id;
    this.fastestContestID = input.fastest_contest_id;
    this.fastestUserID = input.fastest_user_id;
    this.firstSubmissionID = input.first_submission_id;
    this.firstProblemID = input.first_problem_id;
    this.firstContestID = input.first_contest_id;
    this.firstUserID = input.first_user_id;
    this.sourceCodeLength = input.source_code_length;
    this.executionTime = input.execution_time;
    this.point = input.point;
    this.predict = input.predict;
    this.solverCount = input.solver_count;

    return this;
  }
}
