import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { FilesController } from './files.controller';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', '../public'),
      serveRoot: '/public',
      serveStaticOptions: {
        immutable: true,
      },
    }),
  ],
  controllers: [FilesController],
})
export class FilesModule {}
