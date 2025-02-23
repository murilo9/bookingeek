import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.provider';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { RetrieveReservationsQuery } from './queries/retrieve-reservations-query';
import { parseRetrieveReservationsQuery } from './helpers/parseRetrieveReservationsQuery';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateReservationGuard } from './guards/create-reservation.guard';

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

  @UseGuards(CreateReservationGuard)
  @Post('reservations')
  createReservation(
    @Body(new ValidationPipe(CreateReservationDto))
    createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createReservation(createReservationDto);
  }
}
