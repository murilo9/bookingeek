import { Inject, Injectable } from '@nestjs/common';
import { Filter, ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import {
  Resource,
  RetrieveResourceAvailabilityQuery,
  FromPersistentEntity,
  Reservation,
  reservationsTimeOverlap,
  RetrieveResourceAvailabilityResponse,
  DAY_OF_WEEK_NAME,
  DayOfWeekAvailability,
} from '@bookingeek/core';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

const INITIAL_AVAILABILITY_RULES = {
  ranges: [
    {
      startTimeInMinutesPastMidnight: 60 * 9,
      endTimeInMinutesPastMidnight: 60 * 19,
    },
  ],
  slots: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((time) => ({
    startTimeInMinutesPastMidnight: 60 * time,
    endTimeInMinutesPastMidnight: 60 * (time + 1),
  })),
};

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  /**
   * Retrieves all resources that belongs to a business.
   */
  async retrieveResources(query: Filter<Resource<ObjectId>>) {
    const resources = await this.databaseService.findMany<Resource<ObjectId>>(
      DbCollection.Resources,
      query,
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
  ): Promise<RetrieveResourceAvailabilityResponse<ObjectId>> {
    const resource = await this.databaseService.findOne<Resource<ObjectId>>(
      DbCollection.Resources,
      { _id: resourceId },
    );
    const { availability } = resource;
    const now = new Date();
    const month = query.month ? Number(query.month) : now.getMonth();
    const year = query.year ? Number(query.year) : now.getFullYear();
    // Date used as reference for this whole month
    const referenceMonthDateObj = new Date(year, month, 1, 0, 0, 0, 0);
    const daysInMonth = getDaysInMonth(referenceMonthDateObj);
    // One-indexed list of availability rules for each day in the reference month
    const availabilityDaysInMonth: Array<DayOfWeekAvailability> = [
      { available: false, rules: [] }, // Day zero
    ];
    for (let day = 1; day < daysInMonth; day++) {
      const referenceDayDateObj = new Date(year, month, day, 0, 0, 0, 0);
      const dayOfWeek = referenceDayDateObj.getDay();
      availabilityDaysInMonth.push(availability[DAY_OF_WEEK_NAME[dayOfWeek]]);
    }
    // Retrieves all reservations in the reference month
    const reservationsInReferenceMonth = await this.databaseService.findMany<
      Reservation<ObjectId>
    >(DbCollection.Reservations, {
      resourceId: resource._id,
      startDateTimestamp: {
        $gte: startOfMonth(referenceMonthDateObj).getTime(),
      },
      endDateTimestamp: {
        $lt: endOfMonth(referenceMonthDateObj).getTime(),
      },
    });
    return {
      days: availabilityDaysInMonth.map((availability, dayOfMonth) => ({
        ...availability,
        hasAnyReservationInDay: reservationsInReferenceMonth.some(
          (reservation) => reservation.startDate.day === dayOfMonth,
        ),
        availableSlots: availability.rules.filter((rule) => {
          const reservationsInDayOfMonth = reservationsInReferenceMonth.filter(
            (reservation) => reservation.startDate.day === dayOfMonth,
          );
          const reservationsOverlapWithRule = Boolean(
            reservationsInDayOfMonth.find((reservation) => {
              const overlap = reservationsTimeOverlap(reservation, rule);
              return overlap;
            }),
          );

          return !reservationsOverlapWithRule;
        }),
      })),
      reservations: reservationsInReferenceMonth,
    };
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
      isActive: false,
      availability: {
        sunday: { available: false, rules: [] },
        monday: {
          available: true,
          rules:
            INITIAL_AVAILABILITY_RULES[createResourceDto.reservationTimeType],
        },
        tuesday: {
          available: true,
          rules:
            INITIAL_AVAILABILITY_RULES[createResourceDto.reservationTimeType],
        },
        wednesday: {
          available: true,
          rules:
            INITIAL_AVAILABILITY_RULES[createResourceDto.reservationTimeType],
        },
        thursday: {
          available: true,
          rules:
            INITIAL_AVAILABILITY_RULES[createResourceDto.reservationTimeType],
        },
        friday: {
          available: true,
          rules:
            INITIAL_AVAILABILITY_RULES[createResourceDto.reservationTimeType],
        },
        saturday: { available: false, rules: [] },
      },
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
      priceInCents: null,
      priceTypeMinutes: 60,
      reservationTimeGranularityMinutes: 60,
      subtitle: '',
      unavailability: [],
    };
    const resource = await this.databaseService.insertOne<Resource<ObjectId>>(
      DbCollection.Resources,
      resourceToCreate,
    );
    return resource;
  }

  /**
   * Updates a resource.
   */
  async updateResource(resourceId: ObjectId, resourceDto: UpdateResourceDto) {
    const resourceToUpdate = await this.databaseService.findOne<
      Resource<ObjectId>
    >(DbCollection.Resources, { _id: resourceId });
    // If reservationTimeType changed, clear all availability rules
    if (
      resourceDto.reservationTimeType !== resourceToUpdate.reservationTimeType
    ) {
      Object.keys(resourceDto.availability).forEach((dayOfWeek) => {
        resourceDto.availability[dayOfWeek].rules = [];
      });
    }
    // Applies DTO's changes to resource
    Object.entries(resourceDto).forEach(([key, value]) => {
      resourceToUpdate[key] = value;
    });
    // Persist changes in the database
    await this.databaseService.updateOne<Resource<ObjectId>>(
      DbCollection.Resources,
      resourceToUpdate,
      { _id: resourceId },
    );
    return resourceToUpdate;
  }
}
