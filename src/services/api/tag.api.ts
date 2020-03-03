import { ApiService } from '@/services/api/api.service';
import { Tag } from '@/models/tag';
import { Empty } from '@/models/empty';

class TagApi extends ApiService {
  constructor() {
    super();
  }

  fetchTags(): Promise<Tag[]> {
    return this.getList(Tag, `/tags`, {});
  }

  addTag(tag: Tag): Promise<Tag> {
    return this.post(Tag, '/tags', { tag });
  }
}

export const tagApi = new TagApi();
