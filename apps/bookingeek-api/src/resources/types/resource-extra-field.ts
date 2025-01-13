import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsArray,
} from 'class-validator';

/**
 * An extra field of data to be prompted to users while making a reservation.
 */
export class ResourceExtraField {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  // Field title
  title: string;
  @Expose()
  @IsDefined()
  @IsString()
  @IsIn(['text', 'text-long', 'options-radio', 'options-select', 'checkbox'])
  // Field type
  type: 'text' | 'text-long' | 'options-radio' | 'options-select' | 'checkbox';
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // Field options. Only applies if type = 'options-radio' || ''options-select'
  options?: Array<string>;
}
