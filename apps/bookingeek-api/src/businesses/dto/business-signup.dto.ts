import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

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
  @MinLength(3)
  businessSlug: string;
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
  businessResourcesType: 'venues' | 'services' | 'people' | 'vehicles';
  @Expose()
  @IsDefined()
  @IsString()
  businessField: string;
  @Expose()
  @IsDefined()
  @IsBoolean()
  doesRefund: boolean;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['total', 'partial'])
  refundType: 'total' | 'partial';
  @Expose()
  @IsDefined()
  @IsString()
  refundDescription: string;
}
