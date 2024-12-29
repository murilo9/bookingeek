import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { getDaysInMonth } from 'date-fns';
import {
  Resource,
  RetrieveResourceAvailabilityQuery,
  DayOfWeekAvailability,
} from '@bookingeek/core/resources/types';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async retrieveResources(businessId: ObjectId) {
    const resources = await this.databaseService.findMany<Resource<ObjectId>>(
      DbCollection.Resources,
      { businessId },
    );
    return resources;
  }

  async retrieveResourceAvailability(
    resourceId: ObjectId,
    query: RetrieveResourceAvailabilityQuery,
  ) {
    const resource = await this.databaseService.findOne<Resource<ObjectId>>(
      DbCollection.Resources,
      { _id: resourceId },
    );
    const { availability } = resource;
    const now = new Date();
    const month = query.month ? Number(query.month) : now.getMonth();
    const year = query.year ? Number(query.year) : now.getFullYear();
    // Date used as reference for this whole month
    const referenceMonthDate = new Date(year, month, 1, 0, 0, 0, 0);
    const daysInMonth = getDaysInMonth(referenceMonthDate);
    // ----- 1. Builds the array of availabiluty rules -----
    // One-indexed list of availability rules for each day in the reference month
    const availabilityDaysInMonth = [[]];
    for (let day = 1; day++; day <= daysInMonth) {
      const referenceDayDate = new Date(year, month, day, 0, 0, 0, 0);
      const dayOfWeek = referenceDayDate.getDay();
      const resourceAvailabilityThisDayOfWeek = availability[
        String(dayOfWeek)
      ] as DayOfWeekAvailability;
      if (resourceAvailabilityThisDayOfWeek.available) {
        availabilityDaysInMonth.push(resourceAvailabilityThisDayOfWeek.rules);
      }
    }
    // ----- 2. Removes rules that overlap with reservations -----
    // TODO

    // Finally, returns the array of days with availability rules
    return availabilityDaysInMonth;
  }
}
