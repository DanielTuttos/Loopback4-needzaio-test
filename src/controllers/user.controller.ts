import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  del, get, param, post, put, requestBody,
  response,
  Response,
  RestBindings
} from '@loopback/rest';
import {ContactInfo, UserDocument} from '../models';
import {AppUserRepository, ContactInfoRepository, UserDocumentRepository} from '../repositories';
import {EncryptComparePassword} from '../services/EncryptComparePassword';
import {InfoUserSave} from './TypesUserController';

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
  ): Promise<Response> {

    const user = infoUser.user;
    const contact = infoUser.contact;
    const document = infoUser.document;
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

    return resp.json({result});
  }

  @get('/app-users')
  @response(200, {
    description: 'Array of AppUser model instances',
    // content: {
    //   'application/json': {
    //     schema: {
    //       type: 'array',
    //       items: getModelSchemaRef(AppUser, {includeRelations: true}),
    //     },
    //   },
    // },
  })
  async find(
    // @param.filter(AppUser) filter?: Filter<AppUser>,
    @inject(RestBindings.Http.RESPONSE) resp: Response,
  ) {

    let users: any[] = await this.appUserRepository.find();

    let contact: ContactInfo[];
    let document: UserDocument[];

    for (let us in users) {
      contact = await this.contactInfoRepository.find({where: {UserId: users[us].id}});
      document = await this.userDocumentRepository.find({where: {UserId: users[us].id}});
      users[us].contact = (contact);
      users[us].document = (document);
      users[us].password = "";
    }
    return (users);
  }

  @put('/app-users/{id}')
  @response(204, {
    description: 'AppUser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() infoUser: InfoUserSave,
  ) {

    const encrypt = new EncryptComparePassword();
    const user = infoUser.user;

    const contact = infoUser.contact;

    const document = infoUser.document;

    contact.UserId = id;
    document.UserId = id;

    const contactInfo = await this.contactInfoRepository.findOne({where: {UserId: id}})
    const documentInfo = await this.userDocumentRepository.findOne({where: {UserId: id}})
    user.password = await encrypt.encryptPassword(user.password);

    await this.appUserRepository.replaceById(id, user);
    await this.contactInfoRepository.replaceById(contactInfo?.id, contact);
    await this.userDocumentRepository.replaceById(documentInfo?.id, document);

  }

  @del('/app-users/{id}')
  @response(204, {
    description: 'AppUser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    const contactInfo = await this.contactInfoRepository.findOne({where: {UserId: id}})
    const documentInfo = await this.userDocumentRepository.findOne({where: {UserId: id}})

    await this.appUserRepository.deleteById(id);
    await this.contactInfoRepository.deleteById(contactInfo?.id);
    await this.userDocumentRepository.deleteById(documentInfo?.id);

  }
}
