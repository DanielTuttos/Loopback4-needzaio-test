import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ContactInfo} from '../models';
import {ContactInfoRepository} from '../repositories';

export class ContactInfoController {
  constructor(
    @repository(ContactInfoRepository)
    public contactInfoRepository : ContactInfoRepository,
  ) {}

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

  @get('/contact-infos/count')
  @response(200, {
    description: 'ContactInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ContactInfo) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.contactInfoRepository.count(where);
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

  @patch('/contact-infos')
  @response(200, {
    description: 'ContactInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {partial: true}),
        },
      },
    })
    contactInfo: ContactInfo,
    @param.where(ContactInfo) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.contactInfoRepository.updateAll(contactInfo, where);
  }

  @get('/contact-infos/{id}')
  @response(200, {
    description: 'ContactInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContactInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ContactInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<ContactInfo>
  ): Promise<ContactInfo> {
    return this.contactInfoRepository.findById(id, filter);
  }

  @patch('/contact-infos/{id}')
  @response(204, {
    description: 'ContactInfo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {partial: true}),
        },
      },
    })
    contactInfo: ContactInfo,
  ): Promise<void> {
    await this.contactInfoRepository.updateById(id, contactInfo);
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
