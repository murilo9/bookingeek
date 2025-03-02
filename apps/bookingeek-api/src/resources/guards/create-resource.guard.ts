import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ObjectId } from 'mongodb';
import { DbCollection } from 'src/database/collection.enum';
import { User, Resource } from '@bookingeek/core';
import { CreateResourceDto } from '../dto/create-resource.dto';

/**
 * Checks if a businees with the same title or slug exists.
 * If so, throws a BadRequesteException.
 */
export class CreateResrouceGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: User<ObjectId>; body: CreateResourceDto }>();
    const { title, slug } = request.body;
    const existingResources = await this.databaseService.findMany<
      Resource<ObjectId>
    >(DbCollection.Resources, { $or: [{ title }, { slug }] });
    if (existingResources.length) {
      throw new BadRequestException(
        'A resource with the same slug or title already exists',
      );
    }
    return true;
  }
}
