import { Submission } from '@/models/external-api/submission';
import { SessionStorageService } from '@/services/storage/session.storage';
import { SessionStorageKey } from '@/constants/route.enum';

class UserLanguageStorage extends SessionStorageService {
  constructor() {
    super();
    this.key = SessionStorageKey.UserLanguage;
  }

  public setItem<UserLanguage>(value: UserLanguage[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem<UserLanguage>(): UserLanguage[] {
    const dutyData = sessionStorage.getItem(this.key);
    if (dutyData === null) {
      return [];
    }
    const json: any = JSON.parse(dutyData);
    return json.map((s: any) => new Submission().deserialize(s));
  }
}

export const userLanguageStorage: UserLanguageStorage = new UserLanguageStorage();
