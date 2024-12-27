import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}
}
