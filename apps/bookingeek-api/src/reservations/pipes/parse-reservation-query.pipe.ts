import { Reservation } from '@bookingeek/core';
import { PipeTransform, Injectable } from '@nestjs/common';
import { Filter, ObjectId } from 'mongodb';
import { RetrieveReservationsDto } from '../dto/retrieve-reservations.dto';

@Injectable()
export class ParseReservationsQueryPipe implements PipeTransform {
  transform(value: RetrieveReservationsDto): Filter<Reservation<ObjectId>> {
    const { _id, businessId, resourceIds } = value;
    const obj = {
      _id: _id ? new ObjectId(_id) : undefined,
      businessId: businessId ? new ObjectId(businessId) : undefined,
      resourceId: resourceIds
        ? { $in: resourceIds.split(',').map((id) => new ObjectId(id)) }
        : undefined,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  }
}
