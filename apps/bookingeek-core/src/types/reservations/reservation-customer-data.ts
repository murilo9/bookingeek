import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ReservationCustomerData {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  email: string;
}
