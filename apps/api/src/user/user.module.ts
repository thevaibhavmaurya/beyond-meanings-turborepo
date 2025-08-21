import { forwardRef, Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { BillingModule } from 'src/billing/billing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => JwtAuthModule),
    JwtAuthModule,
    EmailModule,
    ApiKeyModule,
    BillingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
