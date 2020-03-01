import { Tag } from '@/models/tag';

export interface UpdateProblem {
  problemID: number;
  tags: Tag[];
}
