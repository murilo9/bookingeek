import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ObjectId } from 'mongodb';
import { Business, User } from '@bookingeek/core';
import { DbCollection } from 'src/database/collection.enum';
import { SafeObjectId } from 'src/common/helpers/safe-object-id';

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
      .getRequest<{ user: User<ObjectId>; params: { idOrSlug: string } }>();
    const { user } = request;
    const businessIdOrSlug = request.params.idOrSlug;
    const business = await this.databaseService.findOne<Business<ObjectId>>(
      DbCollection.Businesses,
      {
        $or: [
          { _id: SafeObjectId(businessIdOrSlug) },
          { slug: businessIdOrSlug },
        ],
      },
    );
    const userBelongsToBusiness = user.businessId.equals(business._id);
    // Checks if user belongs to the business
    if (!userBelongsToBusiness) {
      throw new ForbiddenException('You do not belong to that business.');
    }
    return true;
  }
}
