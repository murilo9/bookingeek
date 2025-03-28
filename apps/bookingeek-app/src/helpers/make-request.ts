import { RequestErrorResponse } from "@bookingeek/core";
import { BASE_URL } from "../env";
import cookies from "js-cookie";

type Response<T> = {
  success?: T;
  error?: RequestErrorResponse;
};

type Options = {
  baseUrl?: string;
  queryParams?: URLSearchParams;
  headers?: Record<string, string>;
  noJSON?: boolean;
  noContentType?: boolean;
};

// Makes a GET request.
export async function get<T>(
  route: string,
  options?: Options
): Promise<Response<T>> {
  const request = await fetch(
    `${options?.baseUrl || BASE_URL}${route}${options?.queryParams || ""}`
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
export async function post<T>(
  route: string,
  body: unknown,
  options?: Options
): Promise<Response<T>> {
  const request = await fetch(
    `${options?.baseUrl || BASE_URL}${route}${options?.queryParams || ""}`,
    {
      method: "POST",
      body: options?.noJSON ? (body as BodyInit) : JSON.stringify(body),
      headers: {
        authorization: cookies.get("access_token") || "",
        ...options?.headers,
      },
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
