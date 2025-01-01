import { User } from './user';

export type BusinessSignUpResponse<T> = {
  access_token: string;
  user: User<T>;
};
