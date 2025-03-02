import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

/**
 * The possible query string paramters passed to the ReservationsController:retrieveReservations route.
 */
export class RetrieveReservationsQueryDto {
  @Expose()
  @IsOptional()
  @IsString()
  _id?: string;
  @Expose()
  @IsOptional()
  @IsNumberString()
  // Start date timestamp
  startDate?: string;
  @Expose()
  @IsOptional()
  @IsNumberString()
  // End date timestamp
  endDate?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Business ID
  businessId?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Resource(s) ID(s) in 'id1,id2,id3' format
  resourceId?: string;
}
