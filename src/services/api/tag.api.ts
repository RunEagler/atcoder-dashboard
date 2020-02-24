import { ApiService } from '@/services/api/api.service';
import { Tag } from '@/models/tag';

class TagApi extends ApiService {
  constructor() {
    super();
  }

  fetchTags(): Promise<Tag[]> {
    return this.getList(Tag, `/tags`, {});
  }
}

export const tagApi = new TagApi();
