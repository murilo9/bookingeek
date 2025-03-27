import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.provider';
import { EntityShouldExist } from 'src/common/decorators/entity-should-exist';
import { DbCollection } from 'src/database/collection.enum';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeObjectId } from 'src/common/helpers/safe-object-id';
import { UpdateUserGuard } from './guards/update-user.guard';
import { EntityExistsGuard } from 'src/common/guards/entity-exists.guard';
import { IdentityGuard } from 'src/common/guards/identity.guard';
import { RetrieveUsersQuery } from '@bookingeek/core';
import { ParseUsersQueryPipe } from './pipes/parse-users-query.pipe';

@Controller()
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get('users')
  getUsers(
    @Query(new ValidationPipe(RetrieveUsersQuery)) query: RetrieveUsersQuery,
  ) {
    return this.usersService.getUsers(
      new ParseUsersQueryPipe().transform(query),
    );
  }

  @EntityShouldExist('userId', DbCollection.Users, 'User')
  @UseGuards(IdentityGuard, EntityExistsGuard, UpdateUserGuard)
  @Put('/users/:userId')
  updateUser(
    @Body(new ValidationPipe(UpdateUserDto)) updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.updateUser(updateUserDto, SafeObjectId(userId));
  }
}
