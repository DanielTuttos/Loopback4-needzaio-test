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
  AppUser,
  ContactInfo,
} from '../models';
import {AppUserRepository} from '../repositories';

export class AppUserContactInfoController {
  constructor(
    @repository(AppUserRepository) protected appUserRepository: AppUserRepository,
  ) { }

  @get('/app-users/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'Array of AppUser has many ContactInfo',
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
    return this.appUserRepository.contactInfos(id).find(filter);
  }

  @post('/app-users/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'AppUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof AppUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'NewContactInfoInAppUser',
            exclude: ['id'],
            optional: ['UserId']
          }),
        },
      },
    }) contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.appUserRepository.contactInfos(id).create(contactInfo);
  }

  @patch('/app-users/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'AppUser.ContactInfo PATCH success count',
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
    return this.appUserRepository.contactInfos(id).patch(contactInfo, where);
  }

  @del('/app-users/{id}/contact-infos', {
    responses: {
      '200': {
        description: 'AppUser.ContactInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.appUserRepository.contactInfos(id).delete(where);
  }
}
