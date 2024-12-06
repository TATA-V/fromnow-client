import { AxiosError } from 'axios';

export type BaseAxiosError = AxiosError<{ code: number; message: string; status: boolean }>;
