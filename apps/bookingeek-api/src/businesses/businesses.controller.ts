import { Controller, Inject } from '@nestjs/common';
import { BusinessesService } from './businesses.provider';

@Controller()
export class BusinessesController {
  constructor(
    @Inject(BusinessesService) private businessService: BusinessesService,
  ) {}
}
