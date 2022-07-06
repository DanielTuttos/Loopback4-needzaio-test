import {inject} from '@loopback/core';
import {
  Filter, repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {Country} from '../models';
import {CountryRepository} from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryRepository)
    public countryRepository: CountryRepository,
  ) { }

  @post('/countries')
  @response(200, {
    description: 'Country model instance',
    content: {'application/json': {schema: getModelSchemaRef(Country)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    country: Omit<Country, 'id'>,
    @inject(RestBindings.Http.RESPONSE) resp: Response,
  ) {
    const countryRegister = await this.countryRepository.findOne({where: {CountryCode: country.CountryCode}});
    if (!countryRegister) {
      const count = await this.countryRepository.create(country)
      return count;
    } else {
      return resp.status(400).json({message: "The country " + countryRegister.CountryName + " is already registered"})
    }
  }

  @get('/countries')
  @response(200, {
    description: 'Array of Country model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Country, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Country) filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.countryRepository.find(filter);
  }


  @put('/countries/{id}')
  @response(204, {
    description: 'Country PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() country: Country,
  ): Promise<void> {
    await this.countryRepository.replaceById(id, country);
  }

  @del('/countries/{id}')
  @response(204, {
    description: 'Country DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.countryRepository.deleteById(id);
  }
}
