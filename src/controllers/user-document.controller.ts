import {
  Filter, repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {UserDocument} from '../models';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentController {
  constructor(
    @repository(UserDocumentRepository)
    public userDocumentRepository: UserDocumentRepository,
  ) { }

  @post('/user-documents')
  @response(200, {
    description: 'UserDocument model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserDocument)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {
            title: 'NewUserDocument',
            exclude: ['id'],
          }),
        },
      },
    })
    userDocument: Omit<UserDocument, 'id'>,
  ): Promise<UserDocument> {
    return this.userDocumentRepository.create(userDocument);
  }

  @get('/user-documents')
  @response(200, {
    description: 'Array of UserDocument model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserDocument, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserDocument) filter?: Filter<UserDocument>,
  ): Promise<UserDocument[]> {
    return this.userDocumentRepository.find(filter);
  }


  @put('/user-documents/{id}')
  @response(204, {
    description: 'UserDocument PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userDocument: UserDocument,
  ): Promise<void> {
    await this.userDocumentRepository.replaceById(id, userDocument);
  }

  @del('/user-documents/{id}')
  @response(204, {
    description: 'UserDocument DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userDocumentRepository.deleteById(id);
  }
}
