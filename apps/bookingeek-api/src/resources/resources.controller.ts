import { Controller, Inject } from '@nestjs/common';
import { ResourcesService } from './resources.provider';

@Controller()
export class ResourcesController {
  constructor(
    @Inject(ResourcesService) private resourcesService: ResourcesService,
  ) {}
}
