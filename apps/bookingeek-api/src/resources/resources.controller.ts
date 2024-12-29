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
import { RetrieveResourceAvailabilityQuery } from '@bookingeek/core/resources/types';

@Controller()
export class ResourcesController {
  constructor(
    @Inject(ResourcesService) private resourcesService: ResourcesService,
  ) {}

  /**
   * Retrieves a resource's availability rules for the given month/year.
   * Defaults to current month/year if not specified.
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

  /**
   * Retrieves all resources that belongs to a business. Called by anyone.
   */
  @EntityShouldExist('id', DbCollection.Businesses, 'business')
  @UseGuards(EntityExistsGuard)
  @Get('resources')
  retrieveBusinessResources(@Query() query: { businessId: string }) {
    return this.resourcesService.retrieveResources(
      new ObjectId(query.businessId),
    );
  }
}
