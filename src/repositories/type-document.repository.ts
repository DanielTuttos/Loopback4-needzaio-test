import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {TypeDocument, TypeDocumentRelations, UserDocument} from '../models';
import {UserDocumentRepository} from './user-document.repository';

export class TypeDocumentRepository extends DefaultCrudRepository<
  TypeDocument,
  typeof TypeDocument.prototype.id,
  TypeDocumentRelations
> {

  public readonly userDocuments: HasManyRepositoryFactory<UserDocument, typeof TypeDocument.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('UserDocumentRepository') protected userDocumentRepositoryGetter: Getter<UserDocumentRepository>,
  ) {
    super(TypeDocument, dataSource);
    this.userDocuments = this.createHasManyRepositoryFactoryFor('userDocuments', userDocumentRepositoryGetter,);
    this.registerInclusionResolver('userDocuments', this.userDocuments.inclusionResolver);
  }
}
