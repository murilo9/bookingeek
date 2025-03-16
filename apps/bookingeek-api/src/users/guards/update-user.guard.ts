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
 * Checks if user is updating himself, or a user from a business he admins.
 * If not, throws a ForbiddenException.
 */
export class UpdateUserGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: User<ObjectId>; params: { userId: string } }>();
    const { user: requestingUser, params } = request;
    const userToUpdate = await this.databaseService.findOne<User<ObjectId>>(
      DbCollection.Users,
      { _id: SafeObjectId(params.userId) },
    );
    const requestingUserBusiness = await this.databaseService.findOne<
      Business<ObjectId>
    >(DbCollection.Businesses, { _id: requestingUser.businessId });
    const userIsUpdatingHimself = userToUpdate._id.equals(requestingUser._id);
    const userIsUpdatingEmployee =
      requestingUserBusiness.adminUserId.equals(requestingUser._id) &&
      userToUpdate.businessId.equals(requestingUserBusiness._id);
    // Checks if user belongs to the business
    if (!userIsUpdatingHimself && !userIsUpdatingEmployee) {
      throw new ForbiddenException("You don't have permission to do that.");
    }
    return true;
  }
}
