import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ObjectId } from 'mongodb';
import { DbCollection } from 'src/database/collection.enum';
import {
  User,
  Resource,
  customPriceRuleMatchesDateTime,
  reservationsOverlap,
  Reservation,
  getDateFromDateDef,
  DAY_OF_WEEK_NAME,
} from '@bookingeek/core';
import { CreateReservationDto } from '../dto/create-reservation.dto';

/**
 * Checks if there are active (default or custom) rules for the reservation intent.
 * If not, throws a BadRequesteException.
 * Checks if there are any reservations overlapping with the reservation intent.
 * If so, throws a BadRequesteException.
 */
export class CreateReservationGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: User<ObjectId>; body: CreateReservationDto }>();
    const {
      resourceId,
      startDate,
      startTimeInMinutesPastMidnight,
      endTimeInMinutesPastMidnight,
    } = request.body;
    // Checks if there are active (default or custom) prices for the reservation intent
    const resource = await this.databaseService.findOne<Resource<ObjectId>>(
      DbCollection.Resources,
      { _id: new ObjectId(resourceId) },
    );
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    // Available day of week rule check
    const reservationIntentDayOfWeek = getDateFromDateDef(startDate).getDay();
    const reservationIntentDayOfWeekName =
      DAY_OF_WEEK_NAME[reservationIntentDayOfWeek];
    const defaultActiveAvailability =
      resource.availability[reservationIntentDayOfWeekName];

    if (!defaultActiveAvailability.available) {
      throw new BadRequestException(
        'Resource is not available this day of week',
      );
    }
    // Available time rule check
    const availableTime = defaultActiveAvailability.rules.find(
      (priceRule) =>
        priceRule.startInMinutesPastMidnight <=
          startTimeInMinutesPastMidnight &&
        priceRule.endInMinutesPastMidnight >= endTimeInMinutesPastMidnight,
    );
    const customPriceRule = resource.customPrices.find((customPriceRule) =>
      customPriceRuleMatchesDateTime(
        customPriceRule,
        startDate,
        startTimeInMinutesPastMidnight,
        endTimeInMinutesPastMidnight,
      ),
    );
    if (!availableTime && !customPriceRule) {
      throw new BadRequestException(
        'Resource is not available this time of the day',
      );
    }
    // Checks if there are any reservations overlapping with the reservation intent
    const reservationsForIntentedDate = await this.databaseService.findMany<
      Reservation<ObjectId>
    >(DbCollection.Reservations, {
      resourceId: resource._id,
      startDate: {
        year: startDate.year,
        month: startDate.month,
        day: startDate.day,
      },
    });
    const overlappingReservation = reservationsForIntentedDate.find(
      (reservation) =>
        reservationsOverlap(reservation, {
          startTimeInMinutesPastMidnight,
          endTimeInMinutesPastMidnight,
        }),
    );
    if (overlappingReservation) {
      throw new Error(
        'There is an overlapping reservation: ' + overlappingReservation._id,
      );
    }
    return true;
  }
}
