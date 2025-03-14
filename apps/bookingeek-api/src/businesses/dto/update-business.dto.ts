import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RefundingPolicyDto } from './refunding-policy.dto';

export class UpdateBusinessDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pictureUrl: string | null;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  slug: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => RefundingPolicyDto)
  refundingPolicy: RefundingPolicyDto;
}
