import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RetrieveResourcesQueryDto {
  @Expose()
  @IsOptional()
  @IsString()
  businessId?: string;
  @Expose()
  @IsOptional()
  @IsString()
  _id?: string;
}
