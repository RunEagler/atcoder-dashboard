import { Serializable } from '@/models/serializable';

export class Level implements Serializable<Level> {
  id: number;
  level: string;

  deserialize(input: any): Level {
    this.id = input.id;
    this.level = input.level;

    return this;
  }
}
