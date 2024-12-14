/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

type Options = {
  // If true, makes the validator return the plain value instead of transformed class intance.
  // That is used when only some fields of the DTO are passed on, so class-transformer won't
  // create an instance with the remaining fields empty.
  passPlainValue?: boolean;
  // If true, validate the "value" object instead of the "transformed" object
  validateBeforeTransform?: boolean;
};

/**
 * This is the validation pipe primarily implemented as suggested by
 * (Next.js docs)[https://docs.nestjs.com/pipes], with some extra features.
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(
    private dtoClass: any,
    private options: Options = {},
  ) {}

  async transform(value: any): Promise<any> {
    const transformed = plainToInstance(this.dtoClass, value, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    //console.log(this.dtoClass, transformed, value);
    const errors = await validate(
      this.options.validateBeforeTransform ? value : transformed,
    );

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return this.options.passPlainValue ? value : transformed;
  }

  private toValidate(metatype: () => void): boolean {
    const types: Array<() => void> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
