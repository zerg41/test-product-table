import { IProduct } from 'types';

const BASE_URL = 'http://127.0.0.1:3001';

const HttpMethod = {
  GET: 'get',
  POST: 'post',
} as const;

async function sendRequest<Response>(url: string, config?: RequestInit): Promise<Response> {
  try {
    let res = await fetch(url, config);
    let data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const api = {
  get: <Response>(endpointUrl: string, config?: RequestInit) =>
    sendRequest<Response>(`${BASE_URL}${endpointUrl}`, { method: HttpMethod.GET, ...config }),
  post: <Response, Request>(endpointUrl: string, body: Request, config?: RequestInit) =>
    sendRequest<Response>(`${BASE_URL}${endpointUrl}`, {
      method: HttpMethod.POST,
      body: JSON.stringify(body),
      ...config,
    }),
} as const;

export async function getDocuments(id: number) {
  return await api.get<IProduct[]>(`/documents${id}`);
}

export async function postCancel(ids: string[]) {
  return await api.post<{ result: string; cancelledItems: string[] }, typeof ids>('/cancel', ids);
}
