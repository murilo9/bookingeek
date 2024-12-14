import { Expose } from 'class-transformer';
import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class BusinessSignUpDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  businessName: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  businessField: string;
  @Expose()
  @IsDefined()
  @IsString()
  businessAddress: string;
  @Expose()
  @IsDefined()
  @IsString()
  businessPhoneNumber: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  adminUserFullName: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  adminUserEmail: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  adminUserPassword: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['venues', 'services', 'people', 'vehicles'])
  businessArea: 'venues' | 'services' | 'people' | 'vehicles';
}
