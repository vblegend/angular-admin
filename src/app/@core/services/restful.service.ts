

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


export class RestfulService {
    public async get<T>(url: string): Promise<T> {
        const result = await axios.get<T>(url);
        return result.data;
    }
}