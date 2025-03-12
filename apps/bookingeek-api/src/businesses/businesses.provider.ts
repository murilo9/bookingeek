import { Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { DbCollection } from 'src/database/collection.enum';
import * as bcrypt from 'bcryptjs';
import {
  BusinessSignUpResponse,
  Business,
  FromPersistentEntity,
  User,
  SignInProvider,
} from '@bookingeek/core';
import { UserPassword } from 'src/common/types/user-password.entity';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

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
  async businessSignUp(
    businessSignUpDto: BusinessSignUpDto,
  ): Promise<BusinessSignUpResponse<ObjectId>> {
    // Pre-creates businness
    const businessToCreate: Omit<Business<ObjectId>, FromPersistentEntity> = {
      name: businessSignUpDto.businessName,
      slug: businessSignUpDto.businessSlug,
      address: businessSignUpDto.businessAddress,
      phone: businessSignUpDto.businessPhoneNumber,
      pictureUrl: null,
      adminUserId: null as ObjectId,
      stripeConnectedAccountId: null,
      refundingPolicy: {
        doesRefund: businessSignUpDto.doesRefund,
        refundType: businessSignUpDto.refundType,
        description: businessSignUpDto.refundDescription,
      },
    };
    const business = await this.databaseService.insertOne<Business<ObjectId>>(
      DbCollection.Businesses,
      businessToCreate,
    );
    // Creates business admin user
    const userToCreate: Omit<User<ObjectId>, FromPersistentEntity> = {
      businessId: business._id,
      email: businessSignUpDto.adminUserEmail,
      name: businessSignUpDto.adminUserFullName,
      signInProvider: businessSignUpDto.signInProvider,
    };
    const adminUser = await this.databaseService.insertOne<User<ObjectId>>(
      DbCollection.Users,
      userToCreate,
    );
    if (businessSignUpDto.signInProvider === SignInProvider.NONE) {
      // Creates business admin user's password if there is no sign in provider
      const hash = bcrypt.hashSync(businessSignUpDto.adminUserPassword, 13);
      const adminUserPasswordToCreate: Omit<
        UserPassword,
        FromPersistentEntity
      > = {
        hash,
        userId: adminUser._id,
      };
      await this.databaseService.insertOne<UserPassword>(
        DbCollection.UserPasswords,
        adminUserPasswordToCreate,
      );
    }
    // Attaches admin user to business
    business.adminUserId = adminUser._id;
    await this.databaseService.updateOne<Business<ObjectId>>(
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
  async signIn(user: User<ObjectId>) {
    // Returns signed access token and user data
    return {
      access_token: sign(user, this.JWT_SECRET, {
        expiresIn: 3600 * 24 * 3, // Expires in 3 days
      }),
      user,
    };
  }

  /**
   * Retrieves a business.
   */
  async retrieveBusiness(_id: ObjectId) {
    const business = await this.databaseService.findOne<Business<ObjectId>>(
      DbCollection.Businesses,
      { _id },
    );
    return business;
  }

  /**
   * Updates a business.
   */
  async updateBusiness(
    updateBusinessDto: UpdateBusinessDto,
    businessId: ObjectId,
  ) {
    let business = await this.databaseService.findOne<Business<ObjectId>>(
      DbCollection.Businesses,
      { _id: businessId },
    );
    business = { ...business, ...updateBusinessDto };
    await this.databaseService.updateOne<Business<ObjectId>>(
      DbCollection.Businesses,
      business,
      { _id: businessId },
    );
    return business;
  }
}
