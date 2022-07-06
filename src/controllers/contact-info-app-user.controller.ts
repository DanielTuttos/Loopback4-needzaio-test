import {
  repository
} from '@loopback/repository';
import {ContactInfoRepository} from '../repositories';

export class ContactInfoAppUserController {
  constructor(
    @repository(ContactInfoRepository)
    public contactInfoRepository: ContactInfoRepository,
  ) { }

  // @get('/contact-infos/{id}/app-user', {
  //   responses: {
  //     '200': {
  //       description: 'AppUser belonging to ContactInfo',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(AppUser)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async getAppUser(
  //   @param.path.string('id') id: typeof ContactInfo.prototype.id,
  // ): Promise<AppUser> {
  //   return this.contactInfoRepository.User(id);
  // }
}
