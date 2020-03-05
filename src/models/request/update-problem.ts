import { Tag } from '@/models/tag';

export interface UpdateProblem {
  problemID: number;
  isAnswer: boolean;
  isFavorite: boolean;
}
