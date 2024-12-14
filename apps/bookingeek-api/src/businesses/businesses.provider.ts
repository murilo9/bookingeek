import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { User } from './entities/user.entity';
import { SignInGuard } from './guards/sign-in.guard';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Business } from './entities/business.entity';
import { FromPersistentEntity } from 'src/database/types/from-persistent-entity';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import { UserPassword } from './entities/user-password.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BusinessesService {
  private JWT_SECRET: string;

  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
    @Inject(ConfigService) configService: ConfigService,
  ) {
    this.JWT_SECRET = configService.get('JWT_SECRET');
  }

  /**
   * Registers a new business with an admin user.
   */
  async businessSignUp(businessSignUpDto: BusinessSignUpDto) {
    // Pre-creates businness
    const businessToCreate: Omit<Business, FromPersistentEntity> = {
      name: businessSignUpDto.businessName,
      address: businessSignUpDto.businessAddress,
      phone: businessSignUpDto.businessPhoneNumber,
      pictureUrl: null,
      adminUserId: null as ObjectId,
      stripeConnectedAccountId: null,
    };
    const business = await this.databaseService.insertOne<Business>(
      DbCollection.Businesses,
      businessToCreate,
    );
    // Creates business admin user
    const userToCreate: Omit<User, FromPersistentEntity> = {
      businessId: business._id,
      email: businessSignUpDto.adminUserEmail,
      name: businessSignUpDto.adminUserFullName,
    };
    const adminUser = await this.databaseService.insertOne<User>(
      DbCollection.Users,
      userToCreate,
    );
    // Creates business admin user's password
    const adminUserPasswordToCreate: Omit<UserPassword, FromPersistentEntity> =
      {
        hash: bcrypt.hash(businessSignUpDto.adminUserPassword, 13),
        userId: adminUser._id,
      };
    await this.databaseService.insertOne<UserPassword>(
      DbCollection.UserPasswords,
      adminUserPasswordToCreate,
    );
    // Attaches admin user to business
    business.adminUserId = adminUser._id;
    await this.databaseService.updateOne<Business>(
      DbCollection.Businesses,
      business,
      { _id: business._id },
    );
    // Returns sign in data so user can already start signed in
    return {
      access_token: sign(adminUser, this.JWT_SECRET, {
        expiresIn: 3600 * 24 * 3, // Expires in 3 days
      }),
      user: adminUser,
    };
  }

  /**
   * Signs a user in.
   */
  @UseGuards(SignInGuard)
  async signIn(user: User) {
    // Returns signed access token and user data
    return {
      access_token: sign(user, this.JWT_SECRET, {
        expiresIn: 3600 * 24 * 3, // Expires in 3 days
      }),
      user,
    };
  }
}
