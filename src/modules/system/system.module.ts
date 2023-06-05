import { Module } from '@nestjs/common';
import { SoftwareService } from './system.service';
import { SoftwareController } from './system.controller';

@Module({
  providers: [SoftwareService],
  controllers: [SoftwareController],
})
export class SoftwareModule {}
