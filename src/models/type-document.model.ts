import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserDocument} from './user-document.model';

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

  @hasMany(() => UserDocument, {keyTo: 'TypeDocumentId'})
  userDocuments: UserDocument[];

  constructor(data?: Partial<TypeDocument>) {
    super(data);
  }
}

export interface TypeDocumentRelations {
  // describe navigational properties here
}

export type TypeDocumentWithRelations = TypeDocument & TypeDocumentRelations;
