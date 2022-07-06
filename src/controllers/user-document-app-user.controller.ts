import {
  repository
} from '@loopback/repository';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentAppUserController {
  constructor(
    @repository(UserDocumentRepository)
    public userDocumentRepository: UserDocumentRepository,
  ) { }

  // @get('/user-documents/{id}/app-user', {
  //   responses: {
  //     '200': {
  //       description: 'AppUser belonging to UserDocument',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(AppUser)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async getAppUser(
  //   @param.path.string('id') id: typeof UserDocument.prototype.id,
  // ): Promise<AppUser> {
  //   return this.userDocumentRepository.User(id);
  // }
}
