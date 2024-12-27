import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessesModule } from './businesses/businesses.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [BusinessesModule, ReservationsModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
