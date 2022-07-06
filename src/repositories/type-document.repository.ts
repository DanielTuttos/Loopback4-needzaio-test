import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {TypeDocument, TypeDocumentRelations} from '../models';

export class TypeDocumentRepository extends DefaultCrudRepository<
  TypeDocument,
  typeof TypeDocument.prototype.id,
  TypeDocumentRelations
> {
  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource,
  ) {
    super(TypeDocument, dataSource);
  }
}
