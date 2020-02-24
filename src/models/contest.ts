import { Serializable } from '@/models/serializable';

export class Contest implements Serializable<Contest> {
  id: number;
  name: string;
  originalCode: string;

  deserialize(input: any): Contest {
    this.id = input.id;
    this.name = input.name;
    this.originalCode = input.original_code;

    return this;
  }
}
