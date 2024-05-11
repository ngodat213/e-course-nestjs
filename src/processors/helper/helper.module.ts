import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './helper.service.clouldinary';
import { HttpModule } from '@nestjs/axios'
import { EmailService } from './helper.service.email';

const services = [CloudinaryService, EmailService]

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services
})
export class HelperModuleModule {}
