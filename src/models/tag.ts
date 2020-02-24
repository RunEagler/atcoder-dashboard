import { Serializable } from '@/models/serializable';

export class Tag implements Serializable<Tag> {
  id: number;
  word: string;

  deserialize(input: any): Tag {
    this.id = input.id;
    this.word = input.word;

    return this;
  }
}
