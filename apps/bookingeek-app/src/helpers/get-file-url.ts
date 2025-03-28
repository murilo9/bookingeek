import { BASE_URL } from "../env";

export const getFileUrl = (fileName: string) => `${BASE_URL}/${fileName}`;
