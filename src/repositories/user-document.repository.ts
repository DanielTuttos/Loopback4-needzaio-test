import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {UserDocument, UserDocumentRelations} from '../models';

export class UserDocumentRepository extends DefaultCrudRepository<
  UserDocument,
  typeof UserDocument.prototype.id,
  UserDocumentRelations
> {
  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource,
  ) {
    super(UserDocument, dataSource);
  }
}
