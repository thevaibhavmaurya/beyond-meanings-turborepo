import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { add, isPast } from 'date-fns';
import { EmailService } from 'src/email/email.service';
import { HashUtils } from 'src/utils/hash.util';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { IUserProfile } from '@repo/types';
import { JwtAuthService } from 'src/jwt/jwt-auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
    private emailService: EmailService,
    private jwtAuthService: JwtAuthService,
  ) {}

  private generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  private async createUserIfNotExists(email: string) {
    let user = await this.repository.findOne({ where: { email } });

    if (!user) {
      user = this.repository.create({
        email,
        name: email.split('@')[0],
        status: true,
      });
      await this.repository.save(user);
    }

    return user;
  }

  async sendLoginEmail(email: string) {
    const user = await this.createUserIfNotExists(email);

    const accessCode = String(this.generateRandomNumber());
    const accessToken = HashUtils.hash(accessCode);
    const expiresAt = add(new Date(), { minutes: 10 });

    user.accessToken = accessToken;
    user.expiresAt = expiresAt;
    await this.repository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.emailService.sendLoginCode({
      email,
      otp: accessCode,
      expiresAt: expiresAt.toUTCString(),
    });
  }

  async verifyEmailCode(email: string, code: number) {
    const auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      throw new BadRequestException('No user found with this email');
    }

    if (!auth.expiresAt || isPast(auth.expiresAt)) {
      throw new BadRequestException(
        'The verification code has expired. Please request a new one.',
      );
    }

    const isValidCode = await HashUtils.compare(String(code), auth.accessToken);
    if (!isValidCode) {
      throw new BadRequestException('The verification code is invalid.');
    }
  }

  private createAuthToken(authUser: Users) {
    const { id, email } = authUser;
    if (!id) return;
    return this.jwtAuthService.getJwtToken({
      userId: id,
      email,
    });
  }

  async getTokenForUser(email: string) {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.status) {
      throw new UnauthorizedException('User account is disabled');
    }

    return this.createAuthToken(user);
  }

  async getUserProfile(userId: string): Promise<IUserProfile> {
    const user = await this.repository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'name', 'status', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id!,
      email: user.email,
      name: user.name,
      status: user.status,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    };
  }
}
