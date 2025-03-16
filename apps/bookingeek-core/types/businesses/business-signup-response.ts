import { User } from "../users/user";

export type BusinessSignUpResponse<T> = {
  access_token: string;
  user: User<T>;
};
