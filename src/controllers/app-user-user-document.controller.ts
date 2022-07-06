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
  UserDocument,
} from '../models';
import {AppUserRepository} from '../repositories';

export class AppUserUserDocumentController {
  constructor(
    @repository(AppUserRepository) protected appUserRepository: AppUserRepository,
  ) { }

  @get('/app-users/{id}/user-document', {
    responses: {
      '200': {
        description: 'AppUser has one UserDocument',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserDocument),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserDocument>,
  ): Promise<UserDocument> {
    return this.appUserRepository.userDocument(id).get(filter);
  }

  @post('/app-users/{id}/user-document', {
    responses: {
      '200': {
        description: 'AppUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserDocument)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof AppUser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {
            title: 'NewUserDocumentInAppUser',
            exclude: ['id'],
            optional: ['UserId']
          }),
        },
      },
    }) userDocument: Omit<UserDocument, 'id'>,
  ): Promise<UserDocument> {
    return this.appUserRepository.userDocument(id).create(userDocument);
  }

  @patch('/app-users/{id}/user-document', {
    responses: {
      '200': {
        description: 'AppUser.UserDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {partial: true}),
        },
      },
    })
    userDocument: Partial<UserDocument>,
    @param.query.object('where', getWhereSchemaFor(UserDocument)) where?: Where<UserDocument>,
  ): Promise<Count> {
    return this.appUserRepository.userDocument(id).patch(userDocument, where);
  }

  @del('/app-users/{id}/user-document', {
    responses: {
      '200': {
        description: 'AppUser.UserDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserDocument)) where?: Where<UserDocument>,
  ): Promise<Count> {
    return this.appUserRepository.userDocument(id).delete(where);
  }
}
