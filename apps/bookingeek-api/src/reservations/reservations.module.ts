import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.provider';
import { StripeModule } from 'src/stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    StripeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
