import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailTemplates } from '@repo/types';
import { EmailCodeDto } from './email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendLoginCode({ email, otp, expiresAt }: EmailCodeDto) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Login to BeyondMeanings',
      template: IEmailTemplates.SendCode,
      context: { otp, expiresAt },
      text: `Your login code is : ${otp} which is valid till ${expiresAt}`,
    });
  }
}
