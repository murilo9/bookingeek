import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { DbCollection } from 'src/database/collection.enum';
import { Reservation } from 'entities';

// Relevant references: https://stripe.com/docs/connect/enable-payment-acceptance-guide

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {
    const stripeApiKey = configService.get('STRIPE_KEY');
    this.stripe = new Stripe(stripeApiKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  /**
   * Creates a Stripe checkout session.
   */
  createCheckoutSession({
    lineItems,
    metadata,
    platformFeeInCents,
    businessConnectedAccountId,
  }: CreateCheckoutSessionDto) {
    const payload: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      payment_intent_data: {
        application_fee_amount: platformFeeInCents,
        metadata,
        // TODO: add expires_at field
      },
      ui_mode: 'embedded',
      redirect_on_completion: 'never',
    };
    return this.stripe.checkout.sessions.create(payload, {
      stripeAccount: businessConnectedAccountId,
    });
  }

  /**
   * Calles by the webhook when a charge event is emmited by Stripe. Updates the payment status of a reservation.
   */
  async handleCheckoutSessionEvent(checkoutSession: Stripe.Checkout.Session) {
    console.log('checkoutSession', checkoutSession);
    // Retrieves the reservarion
    const reservation = await this.databaseService.findOne<Reservation>(
      DbCollection.Reservations,
      { stripeCheckoutSessionId: checkoutSession.id },
    );
    // If checkout session status is 'complete'
    if (checkoutSession.status === 'complete') {
      // Updates payment status to 'success'
      reservation.paymentStatus = 'success';
      // Attaches Stripe payment intent to the reservation
      reservation.stripePaymentIntentId =
        checkoutSession.payment_intent.toString();
      // Save updates in the DB
      await this.databaseService.updateOne<Reservation>(
        DbCollection.Reservations,
        reservation,
        {
          _id: reservation._id,
        },
      );
    }
  }

  /**
   * Handles an event received from Stripe
   */
  handleEvent(event: Stripe.Event) {
    console.log('event');
    switch (true) {
      case event.type.includes('checkout.session'):
        this.handleCheckoutSessionEvent(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
    }
    return;
  }
}
