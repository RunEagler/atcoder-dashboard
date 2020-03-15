import { Serializable } from '@/models/serializable';

export abstract class SessionStorageService {
  public key: string;

  public abstract setItem<T extends Serializable<T>>(value: T[]): void;

  public abstract getItem<T extends Serializable<T>>(): T[];

  public deleteItem() {
    sessionStorage.removeItem(this.key);
  }

  public get existItem(): boolean {
    return !!sessionStorage.getItem(this.key);
  }
}
