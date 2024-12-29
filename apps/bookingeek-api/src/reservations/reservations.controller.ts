import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.provider';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { RetrieveReservationsQuery } from './types/retrieve-reservations-query';
import { parseRetrieveReservationsQuery } from './helpers/parseRetrieveReservationsQuery';

@Controller()
export class ReservationsController {
  constructor(
    @Inject(ReservationsService)
    private reservationsService: ReservationsService,
  ) {}

  @Get('reservations')
  retrieveReservations(
    @Query(new ValidationPipe(RetrieveReservationsQuery))
    query: RetrieveReservationsQuery,
  ) {
    const retrieveReservationsDto = parseRetrieveReservationsQuery(query);
    return this.reservationsService.retrieveReservations(
      retrieveReservationsDto,
    );
  }
}
