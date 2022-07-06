import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {AppUser, AppUserRelations, UserDocument} from '../models';
import {UserDocumentRepository} from './user-document.repository';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {

  public readonly userDocument: HasOneRepositoryFactory<UserDocument, typeof AppUser.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('UserDocumentRepository') protected userDocumentRepositoryGetter: Getter<UserDocumentRepository>,
  ) {
    super(AppUser, dataSource);
    this.userDocument = this.createHasOneRepositoryFactoryFor('userDocument', userDocumentRepositoryGetter);
    this.registerInclusionResolver('userDocument', this.userDocument.inclusionResolver);
  }
}
