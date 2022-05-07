import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import Mail = require('nodemailer/lib/mailer');
import { SendMailInterface } from 'src/interfaces/email.interface';

/**
 * Email Helper is used for sending emails
 */
@Injectable()
export class EmailHelper {
  /**
   * Send activation email on register
   * @param user
   */
  public async sendActivationMail(user: SendMailInterface): Promise<nodemailer.SentMessageInfo> {
    const appName = process.env.APP_NAME;

    const templateHTML = await this.readFile(path.join(__dirname, '../assets/templates/verify-email.html'));

    const data = {
      appName,
      username: user.user_name || user.email.match(/^([^@]*)@/)[1],
      activationLink: process.env.CLIENT_USER_ACTIVATION_URL + '/' + user.token,
    };

    const messageHtml = ejs.render(templateHTML, data);

    const subject = `Email verification ${appName}`;
    return await this.emailsender(user.email, subject, messageHtml);
  }

  /**
   * Send forgot password mail
   * @param user
   */
  public async sendForgotPasswordMail(user: SendMailInterface): Promise<nodemailer.SentMessageInfo> {
    const appName = process.env.APP_NAME;
    const templateHTML = await this.readFile(path.join(__dirname, '../assets/templates/password-reset.html'));

    const data = {
      appName,
      username: user.user_name || user.email.match(/^([^@]*)@/)[1],
      resetPasswordLink: process.env.CLIENT_USER_RESET_PASSWORD_URL + '/' + user.token,
    };

    const messageHtml = ejs.render(templateHTML, data);

    const subject = `Reset password ${appName}`;
    return await this.emailsender(user.email, subject, messageHtml);
  }

  /**
   * Read file
   * @param url
   * @param opts
   */
  public async readFile(url: string): Promise<string> {
    return fs.readFileSync(url, { encoding: 'utf8', flag: 'r' });
  }

  /**
   * Send email
   * @param email
   * @param subject
   * @param mailbody
   */
  public async emailsender(email: string, subject: string, mailbody: string): Promise<nodemailer.SentMessageInfo> {
    try {
      const tranporter = nodemailer.createTransport({
        port: +process.env.EMAIL_CONFIG_PORT,
        host: process.env.EMAIL_CONFIG_HOST,
        secure: true,
        auth: {
          user: process.env.EMAIL_CONFIG_USERNAME,
          pass: process.env.EMAIL_CONFIG_PASSWORD,
        },
        debug: true,
      });
      const mailOption: Mail.Options = {
        from: `WelcomeHome<no-reply@welcomehome.com>`,
        to: email,
        subject,
        html: mailbody,
      };
      return await tranporter.sendMail(mailOption);
    } catch (e) {
      console.log('internal server error on send email', e);

      throw new InternalServerErrorException('Internal Server error');
    }
  }
}
