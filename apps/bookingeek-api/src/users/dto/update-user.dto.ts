import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}
