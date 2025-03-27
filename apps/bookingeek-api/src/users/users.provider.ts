import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbCollection } from 'src/database/collection.enum';
import { Filter, ObjectId } from 'mongodb';
import { User } from '@bookingeek/core';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  async getUsers(query: Filter<User<ObjectId>>) {
    const users = await this.databaseService.findMany<User<ObjectId>>(
      DbCollection.Users,
      query,
    );
    return users;
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: ObjectId) {
    const { name } = updateUserDto;
    const user = await this.databaseService.findOne<User<ObjectId>>(
      DbCollection.Users,
      {
        _id: userId,
      },
    );
    user.name = name;
    await this.databaseService.updateOne(DbCollection.Users, user, {
      _id: userId,
    });
    return user;
  }
}
