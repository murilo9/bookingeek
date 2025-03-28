import { User } from '@bookingeek/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: User<ObjectId>;
      headers: { authorization: string };
    }>();
    const { authorization } = request.headers;
    try {
      const jwtSecret = this.configService.get('JWT_SECRET');
      console.log('jwtSecret', jwtSecret);
      const { _id } = verify(authorization, jwtSecret) as { _id: string };
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
