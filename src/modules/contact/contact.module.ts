import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService, UserService]
})
export class ContactModule {}
