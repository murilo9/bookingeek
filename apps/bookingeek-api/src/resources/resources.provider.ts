import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { getDaysInMonth } from 'date-fns';
import {
  Resource,
  RetrieveResourceAvailabilityQuery,
  DayOfWeekAvailability,
} from './types';
import { FromPersistentEntity } from 'src/database/types/from-persistent-entity';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  /**
   * Retrieves all resources that belongs to a business.
   */
  async retrieveResources(businessId: ObjectId) {
    const resources = await this.databaseService.findMany<Resource<ObjectId>>(
      DbCollection.Resources,
      { businessId },
    );
    return resources;
  }

  /**
   * Retrieves a resource's availability rules for the given month/year.
   * Defaults to current month/year if not specified.
   */
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

  /**
   * Creates a resource with most fields preset.
   */
  async createResource(
    createResourceDto: CreateResourceDto,
    businessId: ObjectId,
  ) {
    const resourceToCreate: Omit<Resource<ObjectId>, FromPersistentEntity> = {
      ...createResourceDto,
      availability: {
        '0': { available: false, rules: [] },
        '1': { available: false, rules: [] },
        '2': { available: false, rules: [] },
        '3': { available: false, rules: [] },
        '4': { available: false, rules: [] },
        '5': { available: false, rules: [] },
        '6': { available: false, rules: [] },
      },
      availabilityType: 'date-time',
      businessId,
      customPrices: [],
      description: '',
      extraFields: [],
      minimalReservationAdvance: {
        amount: 1,
        unit: 'hours',
      },
      minimalReservationDuration: {
        amount: 1,
        unit: 'hours',
      },
      picture: {
        icon: 'user',
      },
      priceInCents: null,
      priceType: 'hourly',
      reservationTimeGranularity: 'hour',
      subtitle: '',
      unavailability: [],
    };
    const resource = await this.databaseService.insertOne<Resource<ObjectId>>(
      DbCollection.Resources,
      resourceToCreate,
    );
    return resource;
  }
}
