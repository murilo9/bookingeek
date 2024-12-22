import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.provider';
import { ObjectId } from 'mongodb';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';
import { RetrieveResourceAvailabilityQuery } from './types/retrieve-resource-availability-query';

@Controller()
export class ResourcesController {
  constructor(
    @Inject(ResourcesService) private resourcesService: ResourcesService,
  ) {}

  /**
   * Retrieves all resources that belongs to a business. Called by anyone.
   */
  @EntityShouldExist('id', DbCollection.Resources, 'resource')
  @UseGuards(EntityExistsGuard)
  @Get('resource/:id/availability')
  retrieveResourceAvailability(
    @Param('id') resourceId: string,
    @Query() query: RetrieveResourceAvailabilityQuery,
  ) {
    return this.resourcesService.retrieveResourceAvailability(
      new ObjectId(resourceId),
      query,
    );
  }

  @EntityShouldExist('id', DbCollection.Businesses, 'business')
  @UseGuards(EntityExistsGuard)
  @Get('business/:id/resources')
  retrieveBusinessResources(@Param('id') businessId: string) {
    return this.resourcesService.retrieveResources(new ObjectId(businessId));
  }
}
