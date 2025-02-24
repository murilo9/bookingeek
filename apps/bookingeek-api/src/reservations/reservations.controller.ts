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
import { CreateReservationGuard } from './guards/create-reservation.guard';
import {
  CreateReservationDto,
  RetrieveReservationsQuery,
} from '@bookingeek/core';
import { ParseReservationsQueryPipe } from './pipes/parse-reservation-query.pipe';

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
    const retrieveReservationsDto = new ParseReservationsQueryPipe().transform(
      query,
    );
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
