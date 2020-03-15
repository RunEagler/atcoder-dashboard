import { Serializable } from '@/models/serializable';

export class UserLanguage implements Serializable<UserLanguage> {
  userID: number;
  language: string;
  count: number;

  deserialize(input: any): UserLanguage {
    this.userID = input.user_id;
    this.language = input.language;
    this.count = input.count;

    return this;
  }
}
