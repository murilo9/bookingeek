import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.provider';
import { ObjectId } from 'mongodb';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';
import { IdentityGuard } from 'src/common/guards/identity.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateResrouceGuard } from './guards/create-resource.guard';
import { ParseResourcesQueryPipe } from './pipes/parse-resources-query.pipe';
import {
  CreateResourceDto,
  RetrieveResourceAvailabilityQuery,
  RetrieveResourcesQuery,
  UpdateResourceDto,
  User,
} from '@bookingeek/core';

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
  @Get('resources')
  retrieveBusinessResources(
    @Query(new ValidationPipe(RetrieveResourcesQuery))
    query: RetrieveResourcesQuery,
  ) {
    return this.resourcesService.retrieveResources(
      new ParseResourcesQueryPipe().transform(query),
    );
  }

  /**
   * Creates a resource
   */
  @UseGuards(IdentityGuard, CreateResrouceGuard)
  @Post('resources')
  createResource(
    @Body(new ValidationPipe(CreateResourceDto))
    createResourceDto: CreateResourceDto,
    @Req() request: { user: User<ObjectId> },
  ) {
    return this.resourcesService.createResource(
      createResourceDto,
      request.user.businessId,
    );
  }

  @EntityShouldExist('id', DbCollection.Resources, 'resource')
  @UseGuards(IdentityGuard, EntityExistsGuard)
  @Put('resources/:id')
  updateResource(
    @Param('id') resourceId: string,
    @Body(new ValidationPipe(UpdateResourceDto))
    updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.updateResource(
      new ObjectId(resourceId),
      updateResourceDto,
    );
  }
}
