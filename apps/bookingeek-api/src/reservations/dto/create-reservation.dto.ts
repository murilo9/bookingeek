import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
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
  resourceId: string;
  // Reservation start date data
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DateDefDto)
  startDate: DateDefDto;
  // Reservation end date data
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DateDefDto)
  endDate: DateDefDto;
  // Start time, in minutes past midnight. Only applies if type = 'date-time'
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.startTimeInMinutesPastMidnight !== null)
  startTimeInMinutesPastMidnight: number | null;
  // End time, in minutes past midnight. Only applies if type = 'date-time'
  @Expose()
  @IsDefined()
  @IsNumber()
  @ValidateIf((dto) => dto.startTimeInMinutesPastMidnight !== null)
  endTimeInMinutesPastMidnight: number | null;
  // Customer's data
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ReservationCustomerDataDto)
  customerData: ReservationCustomerDataDto;
  // Extra data fields, if any
  @Expose()
  @IsDefined()
  extraFields: Record<string, string | boolean>;
  // Checkout option chosen by the customer
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['online', 'in-loco'])
  checkoutOptionChosen: 'online' | 'in-loco';
}
