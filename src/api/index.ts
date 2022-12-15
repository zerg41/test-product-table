import { IDataItem } from 'types';

const BASE_URL = 'http://127.0.0.1:3001';

const HttpMethod = {
  GET: 'get',
} as const;

async function getRequest<Response>(url: string, config?: RequestInit): Promise<Response> {
  try {
    let res = await fetch(url, config);
    let data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Request error');
  }
}

const api = {
  get: <Response>(endpointUrl: string, config?: RequestInit) =>
    getRequest<Response>(`${BASE_URL}${endpointUrl}`, config),
} as const;

export async function getDocumentsData(id: number) {
  return await api.get<IDataItem[]>(`/documents${id}`, { method: HttpMethod.GET });
}
