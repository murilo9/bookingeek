import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { Filter, ObjectId } from 'mongodb';
import { setMinutes } from 'date-fns';
import { StripeService } from 'src/stripe/stripe.service';
import {
  Resource,
  Business,
  FromPersistentEntity,
  getReservationPriceTotal,
  Reservation,
} from '@bookingeek/core';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
    @Inject(StripeService) private stripeService: StripeService,
  ) {}

  async retrieveReservations(query: Filter<Reservation<ObjectId>>) {
    // Searches the database
    const reservations = await this.databaseService.findMany<
      Reservation<ObjectId>
    >(DbCollection.Reservations, query);
    return reservations;
  }

  async createReservation(createReservationDto: CreateReservationDto) {
    const {
      checkoutOptionChosen,
      customerData,
      endDate,
      endTimeInMinutesPastMidnight,
      extraFields,
      startDate,
      startTimeInMinutesPastMidnight,
    } = createReservationDto;
    const resourceId = new ObjectId(createReservationDto.resourceId);
    const resource = await this.databaseService.findOne<Resource<ObjectId>>(
      DbCollection.Resources,
      { _id: resourceId },
    );
    const business = await this.databaseService.findOne<Business<ObjectId>>(
      DbCollection.Businesses,
      { _id: resource.businessId },
    );
    let startDateObj = new Date(
      `${startDate.year}-${startDate.month + 1}-${startDate.day} 00:00:00`,
    );
    startDateObj = setMinutes(startDateObj, startTimeInMinutesPastMidnight);
    let endDateObj = new Date(
      `${endDate.year}-${endDate.month + 1}-${endDate.day} 00:00:00`,
    );
    endDateObj = setMinutes(startDateObj, startTimeInMinutesPastMidnight);
    const reservationToCreate: Omit<
      Reservation<ObjectId>,
      FromPersistentEntity
    > = {
      businessId: business._id,
      cancelledBy: null,
      checkoutOptionChosen,
      checkoutSessionClientSecret: null,
      code: 0,
      customerData,
      endDate,
      endDateTimestamp: endDateObj.getTime(),
      startDate,
      endTimeInMinutesPastMidnight,
      extraFields,
      paymentStatus: 'pending',
      refundedAmountInCents: 0,
      totalPriceInCents: 0,
      resourceId,
      resourceJSON: JSON.stringify(resource),
      startDateTimestamp: startDateObj.getTime(),
      startTimeInMinutesPastMidnight,
      stripePaymentIntentId: null,
      type: resource.availabilityType,
    };
    // If online checkout was chosen, creates Stripe checkout session
    if (checkoutOptionChosen === 'online') {
      const totalPriceInCents = getReservationPriceTotal(
        reservationToCreate,
        resource,
      );
      const stripeCheckoutSession =
        await this.stripeService.createCheckoutSession({
          businessConnectedAccountId: business.stripeConnectedAccountId,
          lineItems: [
            {
              quantity: 1,
              price_data: {
                currency: 'USD',
                product_data: {
                  name: resource.title,
                },
                unit_amount: totalPriceInCents,
              },
            },
          ],
          platformFeeInCents: Math.round(totalPriceInCents / 10),
        });
      reservationToCreate.totalPriceInCents = totalPriceInCents;
      reservationToCreate.stripePaymentIntentId = stripeCheckoutSession.id;
      reservationToCreate.checkoutSessionClientSecret =
        stripeCheckoutSession.client_secret;
    }
    // Inserts the reservation in the database
    const reservation = await this.databaseService.insertOne<
      Reservation<ObjectId>
    >(DbCollection.Reservations, reservationToCreate);
    return reservation;
  }

  async cancelReservation(
    reservationId: ObjectId,
    cancelledBy: 'business' | 'customer',
  ) {
    const reservationToCancel = await this.databaseService.updateOne<
      Reservation<ObjectId>
    >(DbCollection.Reservations, { cancelledBy }, { _id: reservationId });
    return reservationToCancel;
  }
}
