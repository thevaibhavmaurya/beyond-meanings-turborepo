import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { add, isPast } from 'date-fns';
import { EmailService } from 'src/email/email.service';
import { HashUtils } from 'src/utils/hash.util';
import { DataSource, Repository } from 'typeorm';
import { Users } from './user.entity';
import { IUserProfile } from '@repo/types';
import { JwtAuthService } from 'src/jwt/jwt-auth.service';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { BillingService } from 'src/billing/billing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
    private dataSource: DataSource,
    private emailService: EmailService,
    private jwtAuthService: JwtAuthService,
    private apiKeyService: ApiKeyService,
    private billingService: BillingService,
  ) {}

  private generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  private createUserIfNotExists(email: string) {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      let user = await transactionalEntityManager.findOne(Users, {
        where: { email },
      });

      if (!user) {
        user = transactionalEntityManager.create(Users, {
          email,
          name: 'Beyond Meanings',
          status: true,
        });
        await transactionalEntityManager.save(user);

        const apiKey = this.apiKeyService.generateApiKey(
          transactionalEntityManager,
          user.id!,
        );
        await transactionalEntityManager.save(apiKey);

        const billing = this.billingService.createDefaultBilling(
          transactionalEntityManager,
          user.id!,
        );
        await transactionalEntityManager.save(billing);
      }

      return user;
    });
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

  async verifyEmailCode(email: string, code: string) {
    const auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      throw new BadRequestException('No user found with this email');
    }

    if (!auth.expiresAt || isPast(auth.expiresAt)) {
      throw new BadRequestException(
        'The verification code has expired. Please request a new one.',
      );
    }

    const isValidCode = await HashUtils.compare(code, auth.accessToken);
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

    const token = this.createAuthToken(user);
    if (!token) {
      throw new UnauthorizedException('Invalid code');
    }

    return token;
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

  async updateProfileName(userId: string, name: string) {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.name = name;
    return this.repository.save(user);
  }
}
