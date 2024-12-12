import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [
    DatabaseService, // This is REQUEST scoped
    {
      provide: DatabaseService,
      useFactory: async (configService: ConfigService) => {
        // console.log('MONGODB_URI', MONGODB_URI);
        const MONGODB_URI = configService.get('MONGODB_URI');
        const client = new MongoClient(MONGODB_URI);
        try {
          console.log('connecting to database...');
          await client.connect();
          console.log('connected');
        } catch (error) {
          console.log(error);
        }
        return new DatabaseService(client);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
