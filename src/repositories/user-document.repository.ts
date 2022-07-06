import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {UserDocument, UserDocumentRelations, TypeDocument} from '../models';
import {TypeDocumentRepository} from './type-document.repository';

export class UserDocumentRepository extends DefaultCrudRepository<
  UserDocument,
  typeof UserDocument.prototype.id,
  UserDocumentRelations
> {

  public readonly TypeDocument: BelongsToAccessor<TypeDocument, typeof UserDocument.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('TypeDocumentRepository') protected typeDocumentRepositoryGetter: Getter<TypeDocumentRepository>,
  ) {
    super(UserDocument, dataSource);
    this.TypeDocument = this.createBelongsToAccessorFor('TypeDocument', typeDocumentRepositoryGetter,);
    this.registerInclusionResolver('TypeDocument', this.TypeDocument.inclusionResolver);
  }
}
