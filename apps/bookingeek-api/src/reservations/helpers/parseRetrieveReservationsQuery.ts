import { ObjectId } from 'mongodb';
import { RetrieveReservationsDto } from '../dto/retrieve-reservations.dto';
import { RetrieveReservationsQuery } from '../types/retrieve-reservations-query';

/**
 * Parses a query string object into a RetrieveReservationsDto object.
 */
export const parseRetrieveReservationsQuery = (
  query: RetrieveReservationsQuery,
): RetrieveReservationsDto => {
  const dto: RetrieveReservationsDto = {
    businessId: query.business_id,
  };
  if (query.start_date) {
    dto.startDateTimestamp = Number(dto.startDateTimestamp);
  }
  if (query.end_date) {
    dto.endDateTimestamp = Number(dto.endDateTimestamp);
  }
  if (query.resource_ids) {
    console.log('splitted ids', query.resource_ids.split(','));
    dto.resourceIds = query.resource_ids
      .split(',')
      .map((id) => new ObjectId(id));
  }
  return dto;
};
