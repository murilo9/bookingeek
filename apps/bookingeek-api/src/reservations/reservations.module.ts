import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationsController],
})
export class ResourcesModule {}
