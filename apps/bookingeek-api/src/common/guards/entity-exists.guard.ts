import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Reflector } from '@nestjs/core';
import { DbCollection } from 'src/database/collection.enum';
import { SafeObjectId } from '../helpers/safe-object-id';

/**
 * Verifies if entity exists.
 * If not, throws a NotFoundException.
 * Entity data is stored in the reflectors.
 * This guard prevents that other guards have to check for the existence of entities in order to throw 404 errors.
 */
export class EntityExistsGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      params: { [key: string]: string };
    }>();
    const idOrSlugRequestParam = this.reflector.get<string>(
      'idOrSlugRequestParam',
      context.getHandler(),
    );
    const entityCollection = this.reflector.get<DbCollection>(
      'entityCollection',
      context.getHandler(),
    );
    const entityName = this.reflector.get<string>(
      'entityName',
      context.getHandler(),
    );

    const entityIdOrSlug = request.params[idOrSlugRequestParam];
    const query = {
      $or: [{ _id: SafeObjectId(entityIdOrSlug) }, { slug: entityIdOrSlug }],
    };
    console.log(entityName);
    console.log(query);
    const entity = await this.databaseService.findOne(entityCollection, query);
    console.log(entity);
    if (!entity) {
      throw new NotFoundException(`${entityName} not found`);
    }
    return true;
  }
}
