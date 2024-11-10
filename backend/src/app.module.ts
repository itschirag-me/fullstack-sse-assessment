import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env, validationSchema } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { SuccessResponseInterceptor } from './interceptors/success-response/success-response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        'env/.env',
        'env/.env.local',
        'env/.env.development',
        'env/.env.staging',
        'env/.env.production',
      ],
      validationSchema: validationSchema,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(Env.JWT_SECRET),
        signOptions: { expiresIn: configService.get(Env.JWT_EXPIRATION_TIME) },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Env.DATABASE_HOST),
        port: configService.get(Env.DATABASE_PORT),
        username: configService.get(Env.DATABASE_USER),
        password: configService.get(Env.DATABASE_PASSWORD),
        database: configService.get(Env.DATABASE_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule { }
