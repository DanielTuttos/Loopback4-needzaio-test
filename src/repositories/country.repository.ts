import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbMongoDataSource} from '../datasources';
import {Country, CountryRelations, ContactInfo} from '../models';
import {ContactInfoRepository} from './contact-info.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly contactInfos: HasManyRepositoryFactory<ContactInfo, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.DbMongo') dataSource: DbMongoDataSource, @repository.getter('ContactInfoRepository') protected contactInfoRepositoryGetter: Getter<ContactInfoRepository>,
  ) {
    super(Country, dataSource);
    this.contactInfos = this.createHasManyRepositoryFactoryFor('contactInfos', contactInfoRepositoryGetter,);
    this.registerInclusionResolver('contactInfos', this.contactInfos.inclusionResolver);
  }
}
