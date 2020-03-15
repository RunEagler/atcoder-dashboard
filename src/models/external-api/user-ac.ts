import { Serializable } from '@/models/serializable';

export class UserAC implements Serializable<UserAC> {
  userID: number;
  problemCount: number;
  deserialize(input: any): UserAC {
    this.userID = input.user_id;
    this.problemCount = input.problem_count;

    return this;
  }
}
