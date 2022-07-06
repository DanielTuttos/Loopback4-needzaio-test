import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ContactInfo,
  Country,
} from '../models';
import {ContactInfoRepository} from '../repositories';

export class ContactInfoCountryController {
  constructor(
    @repository(ContactInfoRepository)
    public contactInfoRepository: ContactInfoRepository,
  ) { }

  @get('/contact-infos/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to ContactInfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.string('id') id: typeof ContactInfo.prototype.id,
  ): Promise<Country> {
    return this.contactInfoRepository.Country(id);
  }
}
