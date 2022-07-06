import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'DbMongo',
  connector: 'mongodb',
  url: 'mongodb+srv://test-needzaio:BoonYBFArKWnKPTB@cluster0.6ptgs.mongodb.net/dbTestNeedzaio?retryWrites=true&w=majority',
  host: 'cluster0.6ptgs.mongodb.net',
  port: 27017,
  user: 'test-needzaio',
  password: 'BoonYBFArKWnKPTB',
  database: 'dbTestNeedzaio',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbMongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DbMongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DbMongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
