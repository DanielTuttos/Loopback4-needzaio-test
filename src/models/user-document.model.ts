import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TypeDocument} from './type-document.model';
import {AppUser} from './app-user.model';

@model()
export class UserDocument extends Entity {

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
  Document: string;

  @property({
    type: 'string',
    required: true,
  })
  PlaceExpedition: string;

  @property({
    type: 'date',
    required: true,
  })
  DateExpedition: string;

  @belongsTo(() => TypeDocument)
  TypeDocumentId: string;

  @belongsTo(() => AppUser)
  UserId: string;

  constructor(data?: Partial<UserDocument>) {
    super(data);
  }
}

export interface UserDocumentRelations {
  // describe navigational properties here
}

export type UserDocumentWithRelations = UserDocument & UserDocumentRelations;
