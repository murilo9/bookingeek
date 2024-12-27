import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
