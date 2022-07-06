import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Country,
  ContactInfo,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryContactInfoController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'Array of Country has many ContactInfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContactInfo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ContactInfo>,
  ): Promise<ContactInfo[]> {
    return this.countryRepository.contactInfos(id).find(filter);
  }

  @post('/countries/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'NewContactInfoInCountry',
            exclude: ['id'],
            optional: ['CountryId']
          }),
        },
      },
    }) contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.countryRepository.contactInfos(id).create(contactInfo);
  }

  @patch('/countries/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'Country.ContactInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {partial: true}),
        },
      },
    })
    contactInfo: Partial<ContactInfo>,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.countryRepository.contactInfos(id).patch(contactInfo, where);
  }

  @del('/countries/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'Country.ContactInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.countryRepository.contactInfos(id).delete(where);
  }
}
