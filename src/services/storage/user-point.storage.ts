import { UserPoint } from '@/models/external-api/user-point';
import { SessionStorageService } from '@/services/storage/session.storage';
import { SessionStorageKey } from '@/constants/route.enum';

class UserPointStorage extends SessionStorageService {
  constructor() {
    super();
    this.key = SessionStorageKey.UserPoint;
  }

  public setItem<UserPoint>(value: UserPoint[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem<UserPoint>(): UserPoint[] {
    const dutyData = sessionStorage.getItem(this.key);
    if (dutyData === null) {
      return [];
    }
    const json: any = JSON.parse(dutyData);
    return json.map((s: any) => new UserPoint().deserialize(s));
  }
}

export const userPointStorage: UserPointStorage = new UserPointStorage();
