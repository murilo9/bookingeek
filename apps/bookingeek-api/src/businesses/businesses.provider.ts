import { Inject, Injectable } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Injectable()
export class BusinessesService {
  constructor(@Inject(DatabaseModule) private databaseModule: DatabaseModule) {}
}
