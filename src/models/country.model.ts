import {Entity, model, property, hasMany} from '@loopback/repository';
import {ContactInfo} from './contact-info.model';

@model()
export class Country extends Entity {
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
  CountryCode: string;

  @property({
    type: 'string',
    required: true,
  })
  CountryName: string;

  @hasMany(() => ContactInfo, {keyTo: 'CountryId'})
  contactInfos: ContactInfo[];

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
