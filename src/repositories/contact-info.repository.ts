import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {ContactInfo, ContactInfoRelations, Country, AppUser} from '../models';
import {CountryRepository} from './country.repository';
import {AppUserRepository} from './app-user.repository';

export class ContactInfoRepository extends DefaultCrudRepository<
  ContactInfo,
  typeof ContactInfo.prototype.id,
  ContactInfoRelations
> {

  public readonly Country: BelongsToAccessor<Country, typeof ContactInfo.prototype.id>;

  public readonly User: BelongsToAccessor<AppUser, typeof ContactInfo.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('AppUserRepository') protected appUserRepositoryGetter: Getter<AppUserRepository>,
  ) {
    super(ContactInfo, dataSource);
    this.User = this.createBelongsToAccessorFor('User', appUserRepositoryGetter,);
    this.registerInclusionResolver('User', this.User.inclusionResolver);
    this.Country = this.createBelongsToAccessorFor('Country', countryRepositoryGetter,);
    this.registerInclusionResolver('Country', this.Country.inclusionResolver);
  }
}
