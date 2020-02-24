import { Serializable } from '@/models/serializable';
import { Tag } from '@/models/tag';

export class Problem implements Serializable<Problem> {
  id: number;
  levelID: number;
  contestID: number;
  title: string;
  score: number;
  originalCode: string;
  tags: Tag[];

  deserialize(input: any): Problem {
    this.id = input.id;
    this.levelID = input.level_id;
    this.contestID = input.contest_id;
    this.title = input.title;
    this.score = input.score;
    this.originalCode = input.original_code;
    if (input.tags && input.tags.length > 0) {
      this.tags = input.tags.map((tag: Tag) => new Tag().deserialize(tag));
    }
    return this;
  }
}
