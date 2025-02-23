import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RetrieveResourcesQuery {
  @Expose()
  @IsOptional()
  @IsString()
  businessId?: string;
  @Expose()
  @IsOptional()
  @IsString()
  _id?: string;
}
