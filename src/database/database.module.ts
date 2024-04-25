import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongodbConfig from 'src/configs/mongodb.config';
import { databaseConnectionProviders } from './database.connection.providers';
import { databaseModelsProviders } from './database.model.providers';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [...databaseConnectionProviders, ...databaseModelsProviders],
  exports: [...databaseConnectionProviders, ...databaseModelsProviders],
})

export class DatabaseModule {}
