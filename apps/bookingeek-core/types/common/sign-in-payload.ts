import { Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

/**
 * Data required from frontend while signing a user in.
 */
export class SignInPayload {
  email: string;
  password: string;
}
