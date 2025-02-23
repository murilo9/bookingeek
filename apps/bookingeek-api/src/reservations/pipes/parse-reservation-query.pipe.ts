import { PipeTransform, Injectable } from '@nestjs/common';
import { RetrieveReservationsQuery } from '../queries/retrieve-reservations-query';
import { Filter, ObjectId } from 'mongodb';
import { Reservation } from '../types';

@Injectable()
export class ParseReservationsQueryPipe implements PipeTransform {
  transform(value: RetrieveReservationsQuery): Filter<Reservation<ObjectId>> {
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
