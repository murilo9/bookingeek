import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ObjectId } from 'mongodb';
import { User } from '../types';

/**
 * Checks if requesting user belongs to the business.
 * If not, throws a ForbiddenException.
 */
export class UpdateBusinessGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: User<ObjectId>; params: { id: string } }>();
    const { user } = request;
    const businessId = request.params.id;
    const userBelongsToBusiness = user.businessId.toString() === businessId;
    // Checks if user belongs to the business
    if (!userBelongsToBusiness) {
      throw new ForbiddenException('You do not belong to that business.');
    }
    return true;
  }
}
