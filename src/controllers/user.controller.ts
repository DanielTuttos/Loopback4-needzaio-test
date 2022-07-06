import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {AppUser} from '../models';
import {AppUserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(AppUserRepository)
    public appUserRepository: AppUserRepository,
  ) { }

  @post('/app-users')
  @response(200, {
    description: 'AppUser model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUser, {
            title: 'NewAppUser',
            exclude: ['id'],
          }),
        },
      },
    })
    appUser: Omit<AppUser, 'id'>,
  ): Promise<AppUser> {
    return this.appUserRepository.create(appUser);
  }

  @get('/app-users')
  @response(200, {
    description: 'Array of AppUser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUser) filter?: Filter<AppUser>,
  ): Promise<AppUser[]> {
    return this.appUserRepository.find(filter);
  }

  @get('/app-users/{id}')
  @response(200, {
    description: 'AppUser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AppUser, {exclude: 'where'}) filter?: FilterExcludingWhere<AppUser>
  ): Promise<AppUser> {
    return this.appUserRepository.findById(id, filter);
  }


  @put('/app-users/{id}')
  @response(204, {
    description: 'AppUser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appUser: AppUser,
  ): Promise<void> {
    await this.appUserRepository.replaceById(id, appUser);
  }

  @del('/app-users/{id}')
  @response(204, {
    description: 'AppUser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appUserRepository.deleteById(id);
  }
}
