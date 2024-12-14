import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { BusinessesService } from './businesses.provider';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './entities/user.entity';
import { SignInGuard } from './guards/sign-in.guard';
import { BusinessSignUpGuard } from './guards/business-sign-up.guard';

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
}
