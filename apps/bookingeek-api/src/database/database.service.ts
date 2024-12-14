/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import {
  Db,
  Filter,
  FindCursor,
  MongoClient,
  OptionalUnlessRequiredId,
  UpdateFilter,
  WithId,
} from 'mongodb';
import { DbCollection } from 'src/database/collection.enum';
import { PersistentEntity } from './types/persistent-entity';
import { FromPersistentEntity } from './types/from-persistent-entity';

@Injectable()
export class DatabaseService {
  public readonly db: Db;

  constructor(client: MongoClient) {
    this.db = client.db();
  }

  async findOne<T>(
    collectionName: DbCollection,
    filter: Filter<T>,
    includeSoftDeleted = false,
  ): Promise<WithId<T> | null> {
    const collection = this.db.collection<T>(collectionName);
    const query = await collection.findOne({
      ...filter,
      IS_DELETED: includeSoftDeleted,
    });
    return query;
  }

  async findMany<T>(
    collectionName: DbCollection,
    filter: Filter<T>,
    includeSoftDeleted = false,
  ): Promise<WithId<T>[]> {
    const collection = this.db.collection<T>(collectionName);
    const query = await collection.find({
      ...filter,
      IS_DELETED: includeSoftDeleted,
    });
    return query.toArray();
  }

  /**
   * For retrieving paginated data.
   */
  cursorFindMany<T>(
    collectionName: DbCollection,
    filter: Filter<T>,
    includeSoftDeleted = false,
  ): FindCursor<WithId<T>> {
    const collection = this.db.collection<T>(collectionName);
    const query = collection.find({
      ...filter,
      IS_DELETED: includeSoftDeleted,
    });
    return query;
  }

  async insertOne<T>(
    collectionName: DbCollection,
    entity: Omit<T, FromPersistentEntity>,
  ): Promise<T & PersistentEntity> {
    const collection = this.db.collection<T>(collectionName);
    const created = new Date().getTime();
    const updated = new Date().getTime();
    const entityToInsert = {
      ...entity,
      created,
      updated,
      IS_DELETED: false,
    };
    const query = await collection.insertOne(
      entityToInsert as OptionalUnlessRequiredId<T> & {
        created: number;
        updated: number;
        IS_DELETED: boolean;
      },
    );
    const entityInserted = {
      ...entity,
      created,
      updated,
      IS_DELETED: false,
      _id: query.insertedId,
    };
    return entityInserted as T & PersistentEntity;
  }

  async updateOne<T>(
    collectionName: DbCollection,
    entity: UpdateFilter<T>,
    filter: Filter<T>,
  ): Promise<WithId<T>> {
    const collection = this.db.collection<T>(collectionName);
    const updateContent = {
      ...entity,
      updated: new Date().getTime(),
    } as any;
    const query = await collection.findOneAndUpdate(
      filter,
      {
        $set: updateContent,
      },
      {
        returnDocument: 'after',
      },
    );
    return query;
  }

  async updateMany<T>(
    collectionName: DbCollection,
    entity: UpdateFilter<T>,
    filter: Filter<T>,
  ): Promise<WithId<T>[]> {
    const collection = this.db.collection<T>(collectionName);
    const updateContent = { ...entity, updated: new Date().getTime() } as any;
    await collection.updateMany(filter, {
      $set: updateContent,
    });
    const updatedEntities = await collection.find(filter).toArray();
    return updatedEntities;
  }

  async deleteOne(
    collectionName: DbCollection,
    filter: { [key: string]: any },
  ): Promise<number> {
    const collection = this.db.collection(collectionName);
    const query = await collection.deleteOne(filter);
    return query.deletedCount;
  }

  async deleteMany(
    collectionName: DbCollection,
    filter: { [key: string]: any },
  ): Promise<number> {
    const collection = this.db.collection(collectionName);
    const query = await collection.deleteMany(filter);
    return query.deletedCount;
  }
}
