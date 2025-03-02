import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBusinessDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pictureUrl?: string | null;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;
}
