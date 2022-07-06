import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {AppUser, AppUserRelations} from '../models';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {
  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource,
  ) {
    super(AppUser, dataSource);
  }
}
