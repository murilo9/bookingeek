import { BASE_URL_DEV } from "../env";

export const getFileUrl = (fileName: string) => `${BASE_URL_DEV}/${fileName}`;
