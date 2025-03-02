import { Reservation } from '@bookingeek/core';
import { PipeTransform, Injectable } from '@nestjs/common';
import { Filter, ObjectId } from 'mongodb';
import { RetrieveReservationsQueryDto } from '../dto/retrieve-reservations-query.dto';

@Injectable()
export class ParseReservationsQueryPipe implements PipeTransform {
  transform(
    value: RetrieveReservationsQueryDto,
  ): Filter<Reservation<ObjectId>> {
    const { _id } = value;
    const obj = {
      _id: _id ? new ObjectId(_id) : undefined,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  }
}
