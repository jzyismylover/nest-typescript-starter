import * as os from 'os'
import { Controller, Get } from '@nestjs/common';
import { CPUUtils, mappingJSONResponse } from '@/utils';
import { SoftwareService } from './system.service';

@Controller('software')
export class SoftwareController {
  constructor(private service: SoftwareService) {}
  
  @Get('cpu')
  async getCpuUsage() {
    const _util = new CPUUtils()
    const percentage = await _util.getCPUUsage({ percentage: true })
    return mappingJSONResponse({ data: percentage })
  }

  @Get('memory')
  getMemeoryUsage() {
    const memoryFree = os.freemem()
    const memoryTotal = os.totalmem()
    let usage = (1 - memoryFree / memoryTotal).toFixed(2)
    return mappingJSONResponse({ data: usage });
  }

}