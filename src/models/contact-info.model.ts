import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Country} from './country.model';
import {AppUser} from './app-user.model';

@model()
export class ContactInfo extends Entity {
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
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Phone: string;

  @property({
    type: 'string',
    required: true,
  })
  CelPhone: string;

  @property({
    type: 'string',
    required: true,
  })
  EmergencyName: string;

  @property({
    type: 'string',
    required: true,
  })
  EmergencyPhone: string;

  @belongsTo(() => Country)
  CountryId: string;

  @belongsTo(() => AppUser)
  UserId: string;

  constructor(data?: Partial<ContactInfo>) {
    super(data);
  }
}

export interface ContactInfoRelations {
  // describe navigational properties here
}

export type ContactInfoWithRelations = ContactInfo & ContactInfoRelations;
