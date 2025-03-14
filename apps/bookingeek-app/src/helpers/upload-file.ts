import { RequestErrorResponse } from "@bookingeek/core";
import { BASE_URL_DEV } from "../env";
import cookies from "js-cookie";

type UploadFileResponse = { path: string; mimeType: string };

/**
 * Uploads an image file to the server. Returns the file's URL and MIME type.
 */
export const uploadFile = async (formData: FormData | File) => {
  const request = await fetch(`${BASE_URL_DEV}/files`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: cookies.get("access_token") || "",
    },
  });
  const response: UploadFileResponse | RequestErrorResponse =
    await request.json();
  const success = response as UploadFileResponse;
  const error = response as RequestErrorResponse;
  if (error.error) {
    return { error };
  } else {
    return { success };
  }
};
