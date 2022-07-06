import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {UserDocument, UserDocumentRelations, TypeDocument, AppUser} from '../models';
import {TypeDocumentRepository} from './type-document.repository';
import {AppUserRepository} from './app-user.repository';

export class UserDocumentRepository extends DefaultCrudRepository<
  UserDocument,
  typeof UserDocument.prototype.id,
  UserDocumentRelations
> {

  public readonly TypeDocument: BelongsToAccessor<TypeDocument, typeof UserDocument.prototype.id>;

  public readonly User: BelongsToAccessor<AppUser, typeof UserDocument.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('TypeDocumentRepository') protected typeDocumentRepositoryGetter: Getter<TypeDocumentRepository>, @repository.getter('AppUserRepository') protected appUserRepositoryGetter: Getter<AppUserRepository>,
  ) {
    super(UserDocument, dataSource);
    this.User = this.createBelongsToAccessorFor('User', appUserRepositoryGetter,);
    this.registerInclusionResolver('User', this.User.inclusionResolver);
    this.TypeDocument = this.createBelongsToAccessorFor('TypeDocument', typeDocumentRepositoryGetter,);
    this.registerInclusionResolver('TypeDocument', this.TypeDocument.inclusionResolver);
  }
}
