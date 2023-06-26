import { databaseConfig } from '@app/common/config';
import { authConfig } from '@app/common/config/jwt.config';
import { CommonModuleOptions } from '@app/common/interfaces';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
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
        ConfigModule.forFeature(authConfig()),
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

        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              global: true,
              secret: configService.get<string>('auth.secret'),
              signOptions: {
                expiresIn: configService.get<string>('auth.expiration'),
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [JwtModule],
    };
  }
}
