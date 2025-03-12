import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BusinessesService } from './businesses.provider';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { SignInGuard } from './guards/sign-in.guard';
import { BusinessSignUpGuard } from './guards/business-sign-up.guard';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';
import { ObjectId } from 'mongodb';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { IdentityGuard } from 'src/common/guards/identity.guard';
import { UpdateBusinessGuard } from './guards/update-business.guard';
import { User } from '@bookingeek/core';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { GoogleSignInGuard } from './guards/google-sign-in.guard';

@Controller()
export class BusinessesController {
  constructor(
    @Inject(BusinessesService) private businessService: BusinessesService,
  ) {}

  /**
   * Called for registering a new business.
   */
  @Post('signup')
  @UseGuards(BusinessSignUpGuard)
  businessSignUp(
    @Body(new ValidationPipe(BusinessSignUpDto))
    businessSignUpDto: BusinessSignUpDto,
  ) {
    return this.businessService.businessSignUp(businessSignUpDto);
  }

  /**
   * Called for password sign in a business user.
   */
  @Post('signin')
  @UseGuards(SignInGuard)
  signIn(
    @Body(new ValidationPipe(SignInDto)) signInDto: SignInDto,
    @Req() request: { user: User<ObjectId> },
  ) {
    return this.businessService.signIn(request.user);
  }

  /**
   * Called for signing in/up with Google OAuth.
   */
  @Post('google-signin')
  @UseGuards(GoogleSignInGuard)
  googleSignIn(
    @Req() request: { user?: User<ObjectId>; email?: string; name?: string },
  ) {
    const { user, email, name } = request;
    return user ? this.businessService.signIn(request.user) : { email, name };
  }

  /**
   * Called for retrieving data of any business.
   */
  @EntityShouldExist('id', DbCollection.Businesses, 'Business')
  @UseGuards(EntityExistsGuard)
  @Get('businesses/:id')
  getBusiness(@Param('id') businessId: string) {
    return this.businessService.retrieveBusiness(new ObjectId(businessId));
  }

  /**
   * Called for retrieving data of any business.
   */
  @EntityShouldExist('id', DbCollection.Businesses, 'Business')
  @UseGuards(IdentityGuard, EntityExistsGuard, UpdateBusinessGuard)
  @Put('businesses/:id')
  updateBusiness(
    @Param('id') businessId: string,
    @Body(new ValidationPipe(UpdateBusinessDto))
    updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.updateBusiness(
      updateBusinessDto,
      new ObjectId(businessId),
    );
  }
}
