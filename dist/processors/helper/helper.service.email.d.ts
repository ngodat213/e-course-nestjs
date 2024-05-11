export interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}
export declare class EmailService {
    private transporter;
    private clientIsValid;
    constructor();
    private verifyClient;
    sendMail(mailOptions: EmailOptions): boolean;
    sendMailAs(prefix: string, mailOptions: EmailOptions): boolean;
}
