import { RequestErrorResponse } from './request-error-response';

export type RequestResponse<T> = RequestErrorResponse | T;
