import { Expose } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export type ResourceIconName =
  | 'user'
  | 'place'
  | 'service'
  | 'bed'
  | 'car'
  | 'building'
  | 'table';

/**
 * A resource's picture or icon.
 */
export class ResourcePicture {
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
