import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './helper.clouldinary';
import { HttpModule } from '@nestjs/axios'

const services = [CloudinaryService]

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services
})
export class HelperModuleModule {}
