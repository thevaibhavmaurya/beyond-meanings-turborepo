import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { BillingModule } from './billing/billing.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    EmailModule,
    JwtAuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const password = configService.get<string>('DATABASE_PASS');
        if (!password) throw new Error('DATABASE_PASS is not defined');

        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST') ?? 'localhost',
          port: Number(configService.get<string>('DATABASE_PORT') ?? 5432),
          username: configService.get<string>('DATABASE_USER') ?? 'postgres',
          password,
          database: configService.get<string>('DATABASE_NAME') ?? 'testdb',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          logging: configService.get<string>('DATABASE_LOGGING') === 'true',
          synchronize: true,
          ssl: false,
        };
      },
    }),
    BillingModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
