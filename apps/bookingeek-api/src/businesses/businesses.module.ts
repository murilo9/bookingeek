import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BusinessesController } from './businesses.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigService],
  controllers: [BusinessesController],
})
export class BusinessesModule {}
