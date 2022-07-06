import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<UserDocument>) {
    super(data);
  }
}

export interface UserDocumentRelations {
  // describe navigational properties here
}

export type UserDocumentWithRelations = UserDocument & UserDocumentRelations;
