import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BusinessesController } from './businesses.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessesController],
})
export class BusinessesModule {}
