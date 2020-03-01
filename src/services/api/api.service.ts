import axios, { AxiosRequestConfig } from 'axios';
import { Serializable } from '@/models/serializable';
import { PagingData } from '@/models/paging-data';
import { Pagination } from '@/models/pagination';
import { Empty } from '@/models/empty';

type errorHandlerFunc = (error: any) => any;

const baseURL = 'http://localhost:8000';
const isUseMock = Boolean(process.env.VUE_APP_IS_USE_MOCK);
let apiErrorHandler: errorHandlerFunc;

export const API = axios.create({
  baseURL: baseURL + '/api/',
  // withCredentials: true,
  timeout: 60000,
});

export function setApiErrorHandler(handler: errorHandlerFunc) {
  apiErrorHandler = handler;
}

API.interceptors.request.use(
  config => {
    config.params = config.params || {};
    // config.params['lang'] = cookieService.language;

    return config;
  },
  error => Promise.reject(error),
);

API.interceptors.response.use(undefined, err => {
  if (apiErrorHandler) {
    apiErrorHandler(err);
  }
  if (err.response) {
    return Promise.reject(err.response.data);
  } else {
    return Promise.reject(err);
  }
});

export class ApiService {
  public readonly isUseMock = isUseMock;
  public get<T extends Serializable<T>>(type: new () => T, path: string, params: any): Promise<T> {
    return API.get<T>(path, { params }).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public getDynamic<D>(path: string, params: any): Promise<D> {
    return API.get<D>(path, { params }).then(value => {
      return value.data;
    });
  }

  public getList<T extends Serializable<T>>(type: new () => T, path: string, params: any): Promise<T[]> {
    interface ListData {
      data: T[];
    }
    return API.get<T[]>(path, { params }).then(value => {
      return value.data.map(d => new type().deserialize(d));
    });
  }

  public getPagingData<T extends Serializable<T>>(
    type: new () => T,
    path: string,
    params: any,
  ): Promise<Pagination<T>> {
    return API.get<Pagination<T>>(path, { params }).then(value => {
      const result: Pagination<T> = new Pagination<T>();
      const data: any = value.data;
      result.data = data.data.map((v: any) => new type().deserialize(v));
      result.deserialize(data.meta.pagination);
      return result;
    });
  }

  public delete(path: string, params: any): Promise<any> {
    return API.delete(path, { params }).then(value => value.data);
  }

  public head(path: string, params: any): Promise<any> {
    return API.head(path, { params }).then(value => value.data);
  }

  public post<T extends Serializable<T>>(type: new () => T, path: string, data?: any): Promise<T> {
    return API.post<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public put<T extends Serializable<T>>(type: new () => T, path: string, data?: any): Promise<T> {
    return API.put<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public putJSON<T extends Serializable<T>>(type: new () => T, path: string, data?: any): Promise<T> {
    return API.put<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public patch<T extends Serializable<T>>(type: new () => T, path: string, data?: any): Promise<T> {
    return API.patch<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public postJson<T extends Serializable<T>>(type: new () => T, path: string, data?: any): Promise<T> {
    return API.post<T>(path, data).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public postFile<T extends Serializable<T>>(type: new () => T, path: string, formData: FormData): Promise<T> {
    return API.post<T>(path, formData).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public putFile<T extends Serializable<T>>(type: new () => T, path: string, formData: FormData): Promise<T> {
    return API.put<T>(path, formData).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public downloadFile(fullPath: string, params: any): Promise<Blob> {
    return API.get(fullPath, {
      params,
      responseType: 'blob',
    } as AxiosRequestConfig).then(res => new Blob([res.data]));
  }
}
