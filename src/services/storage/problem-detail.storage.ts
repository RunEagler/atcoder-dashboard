import { Submission } from '@/models/external-api/submission';
import { SessionStorageService } from '@/services/storage/session.storage';
import { SessionStorageKey } from '@/constants/route.enum';

class ProblemDetailStorage extends SessionStorageService {
  constructor() {
    super();
    this.key = SessionStorageKey.ProblemDetail;
  }

  public setItem<ProblemDetail>(value: ProblemDetail[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem<ProblemDetail>(): ProblemDetail[] {
    const dutyData = sessionStorage.getItem(this.key);
    if (dutyData === null) {
      return [];
    }
    const json: any = JSON.parse(dutyData);
    return json.map((s: any) => new Submission().deserialize(s));
  }
}

export const problemDetailStorage: ProblemDetailStorage = new ProblemDetailStorage();
