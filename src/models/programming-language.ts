import { Serializable } from '@/models/serializable';
import { Tag } from 'ant-design-vue';

export class ProgrammingLanguage implements Serializable<ProgrammingLanguage> {
  id: number;
  name: string;
  version: string;

  deserialize(input: any): ProgrammingLanguage {
    this.id = input.id;
    this.name = input.name;
    this.version = input.version;

    return this;
  }
}
