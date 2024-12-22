import { Controller, Get, Inject } from '@nestjs/common';
import { ReservationsService } from './reservations.provider';

@Controller()
export class ReservationsController {
  constructor(
    @Inject(ReservationsService)
    private reservationsService: ReservationsService,
  ) {}
}
