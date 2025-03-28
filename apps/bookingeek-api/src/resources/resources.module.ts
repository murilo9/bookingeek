import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
