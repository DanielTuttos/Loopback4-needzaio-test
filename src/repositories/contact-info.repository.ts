import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {ContactInfo, ContactInfoRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class ContactInfoRepository extends DefaultCrudRepository<
  ContactInfo,
  typeof ContactInfo.prototype.id,
  ContactInfoRelations
> {

  public readonly Country: BelongsToAccessor<Country, typeof ContactInfo.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(ContactInfo, dataSource);
    this.Country = this.createBelongsToAccessorFor('Country', countryRepositoryGetter,);
    this.registerInclusionResolver('Country', this.Country.inclusionResolver);
  }
}
