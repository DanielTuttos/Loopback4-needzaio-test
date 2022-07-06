import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserDocument,
  TypeDocument,
} from '../models';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentTypeDocumentController {
  constructor(
    @repository(UserDocumentRepository)
    public userDocumentRepository: UserDocumentRepository,
  ) { }

  @get('/user-documents/{id}/type-document', {
    responses: {
      '200': {
        description: 'TypeDocument belonging to UserDocument',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeDocument)},
          },
        },
      },
    },
  })
  async getTypeDocument(
    @param.path.string('id') id: typeof UserDocument.prototype.id,
  ): Promise<TypeDocument> {
    return this.userDocumentRepository.TypeDocument(id);
  }
}
