import { IDataItem } from 'types';

const BASE_URL = 'http://127.0.0.1:3001';
const HttpMethod = {
  GET: 'get',
} as const;

async function getRequest<Response>(url: string, config?: RequestInit): Promise<Response> {
  try {
    let res = await fetch(url, config);
    let data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    throw new Error('Error');
  }
}

const api = {
  get: <Response>(endpointUrl: string, config?: RequestInit) =>
    getRequest<Response>(`${BASE_URL}${endpointUrl}`, config),
} as const;

export async function getDataRequest() {
  let data1 = await api.get<IDataItem[]>('/documents1', { method: HttpMethod.GET });
  let data2 = await api.get<IDataItem[]>('/documents2', { method: HttpMethod.GET });

  return [...data1, ...data2];
}
