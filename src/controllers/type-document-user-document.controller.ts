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
  TypeDocument,
  UserDocument,
} from '../models';
import {TypeDocumentRepository} from '../repositories';

export class TypeDocumentUserDocumentController {
  constructor(
    @repository(TypeDocumentRepository) protected typeDocumentRepository: TypeDocumentRepository,
  ) { }

  @get('/type-documents/{id}/user-documents', {
    responses: {
      '200': {
        description: 'Array of TypeDocument has many UserDocument',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserDocument)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserDocument>,
  ): Promise<UserDocument[]> {
    return this.typeDocumentRepository.userDocuments(id).find(filter);
  }

  @post('/type-documents/{id}/user-documents', {
    responses: {
      '200': {
        description: 'TypeDocument model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserDocument)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TypeDocument.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {
            title: 'NewUserDocumentInTypeDocument',
            exclude: ['id'],
            optional: ['TypeDocumentId']
          }),
        },
      },
    }) userDocument: Omit<UserDocument, 'id'>,
  ): Promise<UserDocument> {
    return this.typeDocumentRepository.userDocuments(id).create(userDocument);
  }

  @patch('/type-documents/{id}/user-documents', {
    responses: {
      '200': {
        description: 'TypeDocument.UserDocument PATCH success count',
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
    return this.typeDocumentRepository.userDocuments(id).patch(userDocument, where);
  }

  @del('/type-documents/{id}/user-documents', {
    responses: {
      '200': {
        description: 'TypeDocument.UserDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserDocument)) where?: Where<UserDocument>,
  ): Promise<Count> {
    return this.typeDocumentRepository.userDocuments(id).delete(where);
  }
}
