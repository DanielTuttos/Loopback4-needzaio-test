import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {Country, CountryRelations} from '../models';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {
  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource,
  ) {
    super(Country, dataSource);
  }
}
