import { Inject, Injectable } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Injectable()
export class ResourcesService {
  constructor(@Inject(DatabaseModule) private databaseModule: DatabaseModule) {}
}
