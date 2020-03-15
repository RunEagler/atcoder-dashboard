import { Submission } from '@/models/external-api/submission';
import { SessionStorageService } from '@/services/storage/session.storage';
import {SessionStorageKey} from '@/constants/route.enum';

class SubmissionStorage extends SessionStorageService {
  constructor() {
    super();
    this.key = SessionStorageKey.Submission;
  }

  public setItem<Submission>(value: Submission[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem<Submission>(): Submission[] {
    const dutyData = sessionStorage.getItem(this.key);
    if (dutyData === null) {
      return [];
    }
    const json: any = JSON.parse(dutyData);
    return json.map((s: any) => new Submission().deserialize(s));
  }
}

export const submissionStorage: SubmissionStorage = new SubmissionStorage();
