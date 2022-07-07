import {AppUser, ContactInfo, UserDocument} from '../models';

export interface InfoUserSave {
  user: AppUser,
  contact: ContactInfo,
  document: UserDocument
}

