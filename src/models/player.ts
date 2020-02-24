import { Serializable } from '@/models/serializable';

export class Player implements Serializable<Player> {
  id: number;
  name: string;
  rank: string;
  rating: number;
  participationNum: number;
  nationalOrigin: number;

  deserialize(input: any): Player {
    this.id = input.id;
    this.name = input.name;
    this.rank = input.rank;
    this.rating = input.rating;
    this.participationNum = input.participation_num;
    this.nationalOrigin = input.national_origin;

    return this;
  }
}
