import { Serializable } from './serializable';
export class Pagination<T extends Serializable<T>> {
  data: T[];
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;

  deserialize(input: any) {
    this.total = input.total;
    this.count = input.count;
    this.perPage = input.per_page;
    this.currentPage = input.current_page;
    this.totalPages = input.total_pages;

    return this;
  }
}
