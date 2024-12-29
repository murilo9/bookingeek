import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RetrieveReservationsDto } from './dto/retrieve-reservations.dto';
import { DbCollection } from 'src/database/collection.enum';
import { Filter, ObjectId } from 'mongodb';
import { Reservation } from '@bookingeek/core/reservations/types/reservation';
import { Timestamp } from '@bookingeek/core/common/types/timestamp';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async retrieveReservations(query: RetrieveReservationsDto) {
    // Business ID will always be present in the dbQuery
    const dbQuery: Filter<Reservation<ObjectId>> = {
      buisnessId: new ObjectId(query.businessId),
    };
    // Fills dbQuery's "resourceId" attribute
    if (query.resourceIds) {
      dbQuery.resourceId = {
        $in: query.resourceIds,
      };
    }
    // Start filling dbQuery's "created" attribute
    const createdQuery: Filter<{ startDate: Timestamp; endDate: Timestamp }> =
      {};
    if (query.startDateTimestamp) {
      createdQuery.$gte = query.startDateTimestamp;
    }
    if (query.endDateTimestamp) {
      createdQuery.$lte = query.endDateTimestamp;
    }
    // If createdQUery was filled at all, adds it to the dbQuery
    if (Object.keys(createdQuery).length) {
      dbQuery.created = createdQuery;
    }
    console.log('dbQuery', dbQuery);
    // Searches the database
    const reservations = await this.databaseService.findMany<
      Reservation<ObjectId>
    >(DbCollection.Reservations, dbQuery);
    return reservations;
  }
}
