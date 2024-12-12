import { Body, Controller, Inject, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller()
export class StripeController {
  constructor(@Inject(StripeService) private stripeService: StripeService) {}

  /**
   * Stripe webhook endpoint. Called by Stripe only once an event is emmited.
   */
  @Post('stripe-event')
  onStripeEvent(@Body() body: Stripe.Event) {
    return this.stripeService.handleEvent(body);
  }
}
