import { User } from '@bookingeek/core/businesses/types/user';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { DbCollection } from 'src/database/collection.enum';
import { DatabaseService } from 'src/database/database.service';

/**
 * This guard takes the Authorization header to fetch the requesting user in the database.
 * If the user exists, save it in the request object.
 * Otherwise, throws a ForbiddenException.
 */
export class IdentityGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: User<ObjectId>;
      headers: { authorization: string };
    }>();
    const { authorization } = request.headers;
    try {
      const { _id } = verify(authorization, 'secret') as { _id: string };
      const user = await this.databaseService.findOne<User<ObjectId>>(
        DbCollection.Users,
        {
          _id: new ObjectId(_id),
        },
      );
      if (!user) {
        throw new UnauthorizedException(
          'Could not validate Authorization header.',
        );
      }
      // user _id actually comes as string, so it must be converted to ObjectId here
      request.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Could not validate Authorization header.',
      );
    }
  }
}
