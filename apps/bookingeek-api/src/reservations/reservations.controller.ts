import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.provider';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateReservationGuard } from './guards/create-reservation.guard';
import { ParseReservationsQueryPipe } from './pipes/parse-reservation-query.pipe';
import { RetrieveReservationsDto } from './dto/retrieve-reservations.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { IdentityGuard } from 'src/common/guards/identity.guard';
import { SafeObjectId } from 'src/common/helpers/safe-object-id';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';

@Controller()
export class ReservationsController {
  constructor(
    @Inject(ReservationsService)
    private reservationsService: ReservationsService,
  ) {}

  @Get('reservations')
  retrieveReservations(
    @Query(new ValidationPipe(RetrieveReservationsDto))
    query: RetrieveReservationsDto,
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

  @EntityShouldExist('reservationId', DbCollection.Reservations, 'Reservation')
  @UseGuards(EntityExistsGuard, IdentityGuard)
  @Delete('reservations/:reservationId')
  cancelReservation(@Param('reservationId') reservationId: string) {
    return this.reservationsService.cancelReservation(
      SafeObjectId(reservationId),
      'business',
    );
  }
}
