import { RequestErrorResponse } from "@bookingeek/core";
import { BASE_URL_DEV } from "../env";

type Response<T> = {
  success?: T;
  error?: RequestErrorResponse;
};

type Options = {
  baseUrl?: string;
  queryParams?: URLSearchParams;
};

// Makes a GET request.
async function get<T>(route: string, options?: Options): Promise<Response<T>> {
  const request = await fetch(
    `${options?.baseUrl || BASE_URL_DEV}${route}${options?.queryParams || ""}`
  );
  const response: T | RequestErrorResponse = await request.json();
  const success = response as T;
  const error = response as RequestErrorResponse;
  return {
    success,
    error,
  };
}

// Makes a POST request.
async function post<T>(
  route: string,
  body: unknown,
  options?: Options
): Promise<Response<T>> {
  const request = await fetch(
    `${options?.baseUrl || BASE_URL_DEV}${route}${options?.queryParams || ""}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );
  const response: T | RequestErrorResponse = await request.json();
  const success = response as T;
  const error = response as RequestErrorResponse;
  if (error.error) {
    return { error };
  } else {
    return { success };
  }
}

export const makeRequest = {
  get,
  post,
};
