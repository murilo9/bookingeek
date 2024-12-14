import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { User } from '../entities/user.entity';
import { DbCollection } from 'src/database/collection.enum';
import { BusinessSignUpDto } from '../dto/business-signup.dto';

/**
 * Checks if a user exists with the specified email.
 * If so, throws a bad request exception.
 */
export class BusinessSignUpGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ body: BusinessSignUpDto }>();
    const { adminUserEmail } = request.body;
    const user = await this.databaseService.findOne<User>(DbCollection.Users, {
      email: adminUserEmail,
    });
    // Checks if user exists
    if (user) {
      throw new BadRequestException('That email is already registered.');
    }
    return true;
  }
}
