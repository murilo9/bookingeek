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
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './entities/user.entity';
import { SignInGuard } from './guards/sign-in.guard';
import { BusinessSignUpGuard } from './guards/business-sign-up.guard';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';
import { ObjectId } from 'mongodb';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { IdentityGuard } from 'src/common/guards/identity.guard';
import { UpdateBusinessGuard } from './guards/update-business.guard';

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
   * Called for signin in as a business user.
   */
  @Post('signin')
  @UseGuards(SignInGuard)
  signIn(
    @Body(new ValidationPipe(SignInDto)) signInDto: SignInDto,
    @Req() request: { user: User },
  ) {
    return this.businessService.signIn(request.user);
  }

  /**
   * Called for retrieving data of any business.
   */
  @EntityShouldExist('id', DbCollection.Businesses, 'Business')
  @UseGuards(EntityExistsGuard)
  @Get('business/:id')
  getBusiness(@Param('id') businessId: string) {
    return this.businessService.retrieveBusiness(new ObjectId(businessId));
  }

  /**
   * Called for retrieving data of any business.
   */
  @EntityShouldExist('id', DbCollection.Businesses, 'Business')
  @UseGuards(IdentityGuard, EntityExistsGuard, UpdateBusinessGuard)
  @Put('business/:id')
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
