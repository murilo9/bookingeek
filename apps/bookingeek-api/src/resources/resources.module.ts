import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
