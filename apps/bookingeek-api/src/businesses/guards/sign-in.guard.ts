import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { DatabaseService } from '../../database/database.service';
import { UserPassword } from '../entities/user-password.entity';
import { User } from '../entities/user.entity';
import { DbCollection } from 'src/database/collection.enum';
import { SignInDto } from '../dto/sign-in.dto';

/**
 * Checks if user exists and password matches email.
 * If so, attaches user object to request so it can be used by further services.
 * If not, throws and UnauthorizedException.
 */
export class SignInGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ body: SignInDto; user?: User }>();
    const { email, password } = request.body;
    const user = await this.databaseService.findOne<User>(DbCollection.Users, {
      email,
    });
    // Checks if user exists
    if (!user) {
      throw new BadRequestException('Wrong e-mail or password.');
    }
    const userPassword = await this.databaseService.findOne<UserPassword>(
      DbCollection.UserPasswords,
      {
        userId: user._id,
      },
    );
    // Checks if password exists
    if (!userPassword) {
      throw new BadRequestException('Wrong e-mail or password.');
    }
    // Checks if email and password match
    const match = await compare(password, userPassword.hash);
    if (!match) {
      throw new BadRequestException('Wrong e-mail or password.');
    }
    // Attaches user object to request
    request.user = user;
    return true;
  }
}
