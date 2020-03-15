import { Serializable } from '@/models/serializable';

export class UserPoint implements Serializable<UserPoint> {
  userID: number;
  pointSum: number;

  deserialize(input: any): UserPoint {
    this.userID = input.user_id;
    this.pointSum = input.point_sum;

    return this;
  }
}
