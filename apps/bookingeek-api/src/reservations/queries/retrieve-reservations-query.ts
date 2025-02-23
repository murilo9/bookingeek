import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

/**
 * The possible query string paramters passed to the ReservationsController:retrieveReservations route.
 */
export class RetrieveReservationsQuery {
  @Expose()
  @IsOptional()
  @IsString()
  _id?: string;
  @Expose()
  @IsOptional()
  @IsNumberString()
  // Start date timestamp
  start_date?: string;
  @Expose()
  @IsOptional()
  @IsNumberString()
  // End date timestamp
  end_date?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Business ID
  business_id?: string;
  @Expose()
  @IsOptional()
  @IsString()
  // Resource(s) ID(s) in 'id1,id2,id3' format
  resource_ids?: string;
}
