import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { ObjectId } from 'mongodb';
import { SignInProvider, User } from '@bookingeek/core';
import { GoogleOAuthResponse } from 'src/common/types/google-fetch-response';

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

/**
 * Retrieves the access token from request headers and uses it to get user's email address and name.
 * If user exists, appends them to the request.
 */
export class GoogleSignInGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { 'google-access-token': string };
      user?: User<ObjectId>;
      email?: string;
      name?: string;
    }>();
    const { 'google-access-token': googleAccessToken } = request.headers;
    if (!googleAccessToken) {
      throw new BadRequestException('Could not get googleAccessToken header');
    }
    const googleResponse = await fetch(GOOGLE_API_URL, {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });
    const googleParsedResponse = await googleResponse.json();
    const { email, given_name }: GoogleOAuthResponse = googleParsedResponse;
    const user = await this.databaseService.findOne<User<ObjectId>>(
      DbCollection.Users,
      {
        email,
        signInProvider: SignInProvider.GOOGLE,
      },
    );
    // Checks if user exists
    if (user) {
      request.user = user;
      // Attaches user object to request
    } else {
      request.email = email;
      request.name = given_name;
    }
    return true;
  }
}
