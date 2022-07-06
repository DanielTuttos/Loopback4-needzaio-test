import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeDocument extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  NameTypeDocument: string;


  constructor(data?: Partial<TypeDocument>) {
    super(data);
  }
}

export interface TypeDocumentRelations {
  // describe navigational properties here
}

export type TypeDocumentWithRelations = TypeDocument & TypeDocumentRelations;
