import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsArray,
} from 'class-validator';
import {
  RESOURCE_EXTRA_FIELD_OPTIONS,
  ResourceExtraFieldType,
} from './resource-extra-field-type';

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
  @IsIn(Object.values(RESOURCE_EXTRA_FIELD_OPTIONS))
  // Field type
  type: ResourceExtraFieldType;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // Field options. Only applies if type = 'options-radio' || ''options-select'
  options?: Array<string>;
}
