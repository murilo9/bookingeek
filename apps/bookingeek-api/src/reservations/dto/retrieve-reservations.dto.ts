import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

/**
 * The possible query string paramters passed to the ReservationsController:retrieveReservations route.
 */
export class RetrieveReservationsDto {
  @Expose()
  @IsOptional()
  @IsString()
  _id?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Business ID
  businessId?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Resource(s) ID(s) in 'id1,id2,id3' format
  resourceIds?: string;
}
