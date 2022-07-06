import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {AppUser, AppUserRelations, UserDocument, ContactInfo} from '../models';
import {UserDocumentRepository} from './user-document.repository';
import {ContactInfoRepository} from './contact-info.repository';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {

  public readonly userDocument: HasOneRepositoryFactory<UserDocument, typeof AppUser.prototype.id>;

  public readonly contactInfos: HasManyRepositoryFactory<ContactInfo, typeof AppUser.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('UserDocumentRepository') protected userDocumentRepositoryGetter: Getter<UserDocumentRepository>, @repository.getter('ContactInfoRepository') protected contactInfoRepositoryGetter: Getter<ContactInfoRepository>,
  ) {
    super(AppUser, dataSource);
    this.contactInfos = this.createHasManyRepositoryFactoryFor('contactInfos', contactInfoRepositoryGetter,);
    this.registerInclusionResolver('contactInfos', this.contactInfos.inclusionResolver);
    this.userDocument = this.createHasOneRepositoryFactoryFor('userDocument', userDocumentRepositoryGetter);
    this.registerInclusionResolver('userDocument', this.userDocument.inclusionResolver);
  }
}
