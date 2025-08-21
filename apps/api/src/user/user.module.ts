import { forwardRef, Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => JwtAuthModule),
    JwtAuthModule,
    EmailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
