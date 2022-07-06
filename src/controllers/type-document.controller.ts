import {inject} from '@loopback/core';
import {
  Filter, repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {TypeDocument} from '../models';
import {TypeDocumentRepository} from '../repositories';

export class TypeDocumentController {
  constructor(
    @repository(TypeDocumentRepository)
    public typeDocumentRepository: TypeDocumentRepository,
  ) { }

  @post('/type-documents')
  @response(200, {
    description: 'TypeDocument model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeDocument)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocument, {
            title: 'NewTypeDocument',
            exclude: ['id'],
          }),
        },
      },
    })
    typeDocument: Omit<TypeDocument, 'id'>,
    @inject(RestBindings.Http.RESPONSE) resp: Response,
  ) {
    const countryRegister = await this.typeDocumentRepository.findOne({where: {NameTypeDocument: typeDocument.NameTypeDocument}});
    if (!countryRegister) {
      const count = await this.typeDocumentRepository.create(typeDocument)
      return count;
    } else {
      return resp.status(400).json({message: "The type of document " + typeDocument.NameTypeDocument + " is already registered"})
    }
    // return this.typeDocumentRepository.create(typeDocument);
  }

  @get('/type-documents')
  @response(200, {
    description: 'Array of TypeDocument model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeDocument, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeDocument) filter?: Filter<TypeDocument>,
  ): Promise<TypeDocument[]> {
    return this.typeDocumentRepository.find(filter);
  }


  @put('/type-documents/{id}')
  @response(204, {
    description: 'TypeDocument PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeDocument: TypeDocument,
  ): Promise<void> {
    await this.typeDocumentRepository.replaceById(id, typeDocument);
  }

  @del('/type-documents/{id}')
  @response(204, {
    description: 'TypeDocument DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeDocumentRepository.deleteById(id);
  }
}
