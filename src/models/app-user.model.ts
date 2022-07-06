import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {UserDocument} from './user-document.model';
import {ContactInfo} from './contact-info.model';

@model()
export class AppUser extends Entity {
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
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
  })
  IsMilitar?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  TimeCreate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isTemporal: boolean;

  @property({
    type: 'string',
    required: true,
    index: {unique: true}
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true}
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true}

  })
  emailVerified: string;

  @hasOne(() => UserDocument, {keyTo: 'UserId'})
  userDocument: UserDocument;

  @hasMany(() => ContactInfo, {keyTo: 'UserId'})
  contactInfos: ContactInfo[];

  constructor(data?: Partial<AppUser>) {
    super(data);
  }
}

export interface AppUserRelations {
  // describe navigational properties here
}

export type AppUserWithRelations = AppUser & AppUserRelations;
