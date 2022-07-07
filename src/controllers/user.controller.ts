import {inject} from '@loopback/core';
import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response,
  Response,
  RestBindings
} from '@loopback/rest';
import {AppUser, ContactInfo, UserDocument} from '../models';
import {AppUserRepository, ContactInfoRepository, UserDocumentRepository} from '../repositories';
import {EncryptComparePassword} from '../services/EncryptComparePassword';
// import { model } from '@loopback/repository';

interface InfoUserSave {
  user: AppUser,
  contact: ContactInfo,
  document: UserDocument
}

export class UserController {
  constructor(
    @repository(AppUserRepository)
    public appUserRepository: AppUserRepository,
    @repository(ContactInfoRepository)
    public contactInfoRepository: ContactInfoRepository,
    @repository(UserDocumentRepository)
    public userDocumentRepository: UserDocumentRepository
  ) { }

  @post('/app-users')
  @response(200, {
    description: 'AppUser model instance',
    // content: {'application/json': }},
  })
  async create(
    @requestBody({
      // content: {
      //   'application/json': {
      //     schema: getModelSchemaRef(AppUser, {
      //       title: 'NewAppUser',
      //       exclude: ['id'],
      //     }),
      //   },
      // },
    })
    infoUser: InfoUserSave,
    @inject(RestBindings.Http.RESPONSE) resp: Response
  ) {
    const user = infoUser.user;
    const contact = infoUser.contact;
    const document = infoUser.document;
    // : Promise<any> {
    const encrypt = new EncryptComparePassword();

    // verify that the username and email do not exist
    const userExist = await this.appUserRepository.findOne({where: {or: [{username: user.username}, {email: user.email}]}})
    if (userExist) {
      const exist: string[] = [];
      if (userExist.username === user.username) exist.push("username");
      if (userExist.email === user.email) exist.push("email");
      return resp.status(400).json({message: "The " + exist.join(", ") + " is already registered in the system"});
    }

    // verified email
    if (user.email !== user.emailVerified) return resp.status(400).json({message: "The email and emailVerified must be the same"});

    // save user
    const result = infoUser;
    user.password = await encrypt.encryptPassword(user.password);
    result.user = await this.appUserRepository.create(user);
    result.user.password = "";
    const {id} = result.user;

    // save contact
    contact.UserId = id ?? '1';
    result.contact = await this.contactInfoRepository.create(contact);

    // save document
    document.UserId = id ?? '1';
    result.document = await this.userDocumentRepository.create(document);

    return result;
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
