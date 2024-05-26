import { HttpMethods } from '@/lib/constants';
import { create } from 'zustand';

export const useEnvironment = create((set) => ({
  environment: null as string | null,
  variables: {} as Record<string, string>,
  setEnvironment: (environment: string) => set({ environment }),
  setVariables: (variables: Record<string, string>) => set({ variables }),
}));

export interface IRequestConfig {
  url: string;
  method: HttpMethods;
  headers: { key: string; value: string }[];
  body: string;
  setUrl: (url: string) => void;
  setMethod: (method: HttpMethods) => void;
  setHeaders: (headers: { key: string; value: string }[]) => void;
  setBody: (body: string) => void;
}

export const useRequestConfig = create<IRequestConfig>((set) => ({
  url: '',
  method: HttpMethods.GET,
  headers: [] as { key: string; value: string }[],
  body: '{\n  \n}',
  setUrl: (url: string) => set({ url }),
  setMethod: (method: HttpMethods) => set({ method }),
  setHeaders: (headers: { key: string; value: string }[]) => set({ headers }),
  setBody: (body: string) => set({ body }),
}));