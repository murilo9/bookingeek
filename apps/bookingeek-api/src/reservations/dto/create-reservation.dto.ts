import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { DateDefDto } from 'src/common/dto/date-def.dto';
import { ReservationCustomerDataDto } from './reservation-customer-data.dto';

export class CreateReservationDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  // Reserving resource's ID
  resourceId: string;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DateDefDto)
  // Reservation start date data
  startDate: DateDefDto;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DateDefDto)
  // Reservation end date data
  endDate: DateDefDto;
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.startTimeInMinutesPastMidnight !== null)
  // Start time, in minutes past midnight. Only applies if type = 'date-time'
  startTimeInMinutesPastMidnight: number | null;
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.startTimeInMinutesPastMidnight !== null)
  // End time, in minutes past midnight. Only applies if type = 'date-time'
  endTimeInMinutesPastMidnight: number | null;
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ReservationCustomerDataDto)
  // Customer's data
  customerData: ReservationCustomerDataDto;
  @Expose()
  @IsDefined()
  @IsObject()
  // Extra data fields, if any
  extraFields: Record<string, string | boolean>;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['online', 'in-loco'])
  // Checkout option chosen by the customer
  checkoutOptionChosen: 'online' | 'in-loco';
}
