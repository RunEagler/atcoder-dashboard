import { SessionStorageService } from '@/services/storage/session.storage';
import { UserAC } from '@/models/external-api/user-ac';
import { SessionStorageKey } from '@/constants/route.enum';

class UserACStorage extends SessionStorageService {
  constructor() {
    super();
    this.key = SessionStorageKey.UserAC;
  }

  public setItem<UserAC>(value: UserAC[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem<UserAC>(): UserAC[] {
    const dutyData = sessionStorage.getItem(this.key);
    if (dutyData === null) {
      return [];
    }
    const json: any = JSON.parse(dutyData);
    return json.map((s: any) => new UserAC().deserialize(s));
  }
}

export const userACStorage: UserACStorage = new UserACStorage();
