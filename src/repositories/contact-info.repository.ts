import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {ContactInfo, ContactInfoRelations} from '../models';

export class ContactInfoRepository extends DefaultCrudRepository<
  ContactInfo,
  typeof ContactInfo.prototype.id,
  ContactInfoRelations
> {
  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource,
  ) {
    super(ContactInfo, dataSource);
  }
}
