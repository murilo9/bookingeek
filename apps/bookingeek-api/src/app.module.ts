import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessesModule } from './businesses/businesses.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ResourcesModule } from './resources/resources.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [FilesModule, BusinessesModule, ReservationsModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
