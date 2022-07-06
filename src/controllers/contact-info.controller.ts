import {
  Filter, repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {ContactInfo} from '../models';
import {ContactInfoRepository} from '../repositories';

export class ContactInfoController {
  constructor(
    @repository(ContactInfoRepository)
    public contactInfoRepository: ContactInfoRepository,
  ) { }

  @post('/contact-infos')
  @response(200, {
    description: 'ContactInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContactInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'NewContactInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.contactInfoRepository.create(contactInfo);
  }

  @get('/contact-infos')
  @response(200, {
    description: 'Array of ContactInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContactInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ContactInfo) filter?: Filter<ContactInfo>,
  ): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find(filter);
  }

  @put('/contact-infos/{id}')
  @response(204, {
    description: 'ContactInfo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contactInfo: ContactInfo,
  ): Promise<void> {
    await this.contactInfoRepository.replaceById(id, contactInfo);
  }

  @del('/contact-infos/{id}')
  @response(204, {
    description: 'ContactInfo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactInfoRepository.deleteById(id);
  }
}
