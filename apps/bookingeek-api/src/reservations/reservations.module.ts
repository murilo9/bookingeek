import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.provider';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [DatabaseModule, StripeModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
