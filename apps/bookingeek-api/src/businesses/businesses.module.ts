import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BusinessesController } from './businesses.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessesService } from './businesses.provider';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [BusinessesController],
  providers: [ConfigService, BusinessesService],
})
export class BusinessesModule {}
