import { API_URL } from "@/env";
import axios, { Axios } from "axios";

export const AXIOS_INSTANCE: Axios = axios.create({
  baseURL: `${API_URL}api/v1/`,
});

export async function get(uri: string) {
  return await AXIOS_INSTANCE.get(uri);
}

export async function post<T>(uri: string, request: T) {
  return await AXIOS_INSTANCE.post(uri, request);
}

export async function patch<T>(uri: string, request: T) {
  return await AXIOS_INSTANCE.patch(uri, request);
}

export async function remove(uri: string) {
  return await AXIOS_INSTANCE.delete(uri);
}
