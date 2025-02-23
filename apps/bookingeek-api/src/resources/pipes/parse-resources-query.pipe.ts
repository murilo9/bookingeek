import { PipeTransform, Injectable } from '@nestjs/common';
import { RetrieveResourcesQuery } from '../queries/retrieve-resources-query';
import { Filter, ObjectId } from 'mongodb';
import { Resource } from '../types';

@Injectable()
export class ParseResourcesQueryPipe implements PipeTransform {
  transform(value: RetrieveResourcesQuery): Filter<Resource<ObjectId>> {
    const { _id, businessId } = value;
    const obj = {
      _id: _id ? new ObjectId(_id) : undefined,
      businessId: businessId ? new ObjectId(businessId) : undefined,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  }
}
