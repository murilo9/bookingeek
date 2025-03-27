import { PipeTransform, Injectable } from '@nestjs/common';
import { Filter, ObjectId } from 'mongodb';
import { RetrieveUsersQuery, User } from '@bookingeek/core';
import { SafeObjectId } from 'src/common/helpers/safe-object-id';

@Injectable()
export class ParseUsersQueryPipe implements PipeTransform {
  transform(value: RetrieveUsersQuery): Filter<User<ObjectId>> {
    const { _id, businessId } = value;
    const obj = {
      _id: _id ? SafeObjectId(_id) : undefined,
      businessId: businessId ? SafeObjectId(businessId) : undefined,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  }
}
