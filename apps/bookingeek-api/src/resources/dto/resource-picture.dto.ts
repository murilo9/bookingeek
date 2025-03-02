import { ResourceIconName } from '@bookingeek/core';
import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsIn,
  IsArray,
} from 'class-validator';

/**
 * A resource's picture or icon.
 */
export class ResourcePictureDto {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'place', 'service', 'bed', 'car', 'building', 'table'])
  // Resource icon. Applied if src array is empty.
  icon: ResourceIconName;
  @Expose()
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  // Resource picture(s) array. Can be empty.
  src: Array<string>;
}
