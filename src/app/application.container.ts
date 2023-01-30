import { Container } from 'inversify';
import { Component } from '../types/component.types.js';
import Application from './application.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import LoggerService from '../common/logger/logger.service.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';

const appContainer = new Container();
appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

export {appContainer};
