import { databaseConfig } from '@app/common/config';
import { CommonModuleOptions } from '@app/common/interfaces';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import * as path from 'path';

@Global()
@Module({})
export class CommonModule {
  static register(options: CommonModuleOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        ConfigModule.forRoot({ ...options.configModule }),
        ConfigModule.forFeature(databaseConfig()),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
          buildSchemaOptions: {
            dateScalarMode: 'isoDate',
          },
          playground: !['production'].includes(process.env.NODE_ENV),
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (
            configService: ConfigService,
          ): MongooseModuleFactoryOptions => {
            return {
              uri: `${configService.get<string>(
                'database.uri',
              )}/${configService.get<string>('database.name')}`,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [],
    };
  }
}
