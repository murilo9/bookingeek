import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data required from frontend while signing a user in.
 */
export class SignInDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
