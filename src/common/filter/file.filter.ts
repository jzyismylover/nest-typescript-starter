/**
 * 文件读取异常
 */

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class FileFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    
  }
}