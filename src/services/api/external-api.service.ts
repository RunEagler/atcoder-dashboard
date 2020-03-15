import axios, { AxiosRequestConfig } from 'axios';
import { Serializable } from '@/models/serializable';

type errorHandlerFunc = (error: any) => any;

const baseURL = 'https://kenkoooo.com/atcoder';
const isUseMock = Boolean(process.env.VUE_APP_IS_USE_MOCK);
let apiErrorHandler: errorHandlerFunc;

export const ExternalAPI = axios.create({
  baseURL,
  timeout: 60000,
});

export function setApiErrorHandler(handler: errorHandlerFunc) {
  apiErrorHandler = handler;
}

ExternalAPI.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.params = config.params || {};
    // config.params['lang'] = cookieService.language;

    return config;
  },
  error => Promise.reject(error),
);

ExternalAPI.interceptors.response.use(undefined, err => {
  if (apiErrorHandler) {
    apiErrorHandler(err);
  }
  if (err.response) {
    return Promise.reject(err.response.data);
  } else {
    return Promise.reject(err);
  }
});

export class ExternalApiService {
  public readonly isUseMock = isUseMock;
  public get<T extends Serializable<T>>(type: new () => T, path: string, params: any): Promise<T> {
    return ExternalAPI.get<T>(path, { params }).then(value => {
      return new type().deserialize(value.data);
    });
  }

  public getList<T extends Serializable<T>>(type: new () => T, path: string, params: any): Promise<T[]> {
    interface ListData {
      data: T[];
    }
    return ExternalAPI.get<T[]>(path, { params }).then(value => {
      return value.data.map(d => new type().deserialize(d));
    });
  }
}
