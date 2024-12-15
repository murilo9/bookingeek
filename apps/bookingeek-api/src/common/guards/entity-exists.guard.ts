import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { Reflector } from '@nestjs/core';
import { DbCollection } from 'src/database/collection.enum';

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
    const idRequestParam = this.reflector.get<string>(
      'idRequestParam',
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

    const entityId = new ObjectId(request.params[idRequestParam]);
    const entity = await this.databaseService.findOne(entityCollection, {
      _id: entityId,
    });
    if (!entity) {
      throw new NotFoundException(`${entityName} not found`);
    }
    return true;
  }
}
