import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as APP_CONFIG from '../../app.config'

export interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter
  private clientIsValid: boolean

  constructor(){
    this.transporter = nodemailer.createTransport({
      host: APP_CONFIG.EMAIL.host,
      secure: APP_CONFIG.EMAIL.secure,
      auth: {
        user: APP_CONFIG.EMAIL.user,
        pass: APP_CONFIG.EMAIL.pass
      }
    });
    this.verifyClient();
  }

  private verifyClient(): void {
    return this.transporter.verify((error) => {
      if (error) {
        this.clientIsValid = false
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30)
        console.log(`client init failed! retry after 30 mins`);
      } else {
        this.clientIsValid = true
        console.log('client init succeed.')
      }
    })
  }

  public sendMail(mailOptions: EmailOptions) {
    if (!this.clientIsValid) {
      console.log('send failed! (init failed)')
      return false
    }

    this.transporter.sendMail(
      {
        ...mailOptions,
        from: APP_CONFIG.EMAIL.from
      },
      (error, info) => {
        if (error) {
          console.log(`send failed!`)
        } else {
          console.log('send succeed.')
        }
      }
    )
  }

  public sendMailAs(prefix: string, mailOptions: EmailOptions) {
    return this.sendMail({
      ...mailOptions,
      subject: `[${prefix}] ${mailOptions.subject}`
    })
  }
}