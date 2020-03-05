import { Serializable } from '@/models/serializable';
import { Tag } from '@/models/tag';

export class Problem implements Serializable<Problem> {
  id: number;
  levelID: number;
  contestID: number;
  title: string;
  score: number;
  originalCode: string;
  lastPath: string;
  tags: Tag[] = [];
  isFavorite: boolean;
  isAnswer: boolean;

  deserialize(input: any): Problem {
    this.id = input.problem_id;
    this.levelID = input.level_id;
    this.contestID = input.contest_id;
    this.title = input.title;
    this.score = input.score;
    this.originalCode = input.original_code;
    this.lastPath = input.last_path;
    if (input.tags && input.tags.length > 0) {
      this.tags = input.tags.map((tag: Tag) => new Tag().deserialize(tag));
    }
    this.isFavorite = input.is_favorite;
    this.isAnswer = input.is_answer;
    return this;
  }

  existTag(word: string) {
    return this.tags.findIndex((tag: Tag) => tag.word === word) > -1;
  }
}
