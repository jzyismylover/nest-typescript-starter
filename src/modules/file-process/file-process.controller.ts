import {
  Controller,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllFilter } from '@/common/filter/all.filter';
import { mappingJSONResponse } from '@/utils';
import { AuthGuard } from '@/modules/auth/guard/auth.guard';
import { FileProcessService } from './file-process.service';

// @UseFilters(AllFilter)
@Controller('file-process')
export class FileProcessController {
  constructor(private fileService: FileProcessService) {}

  @Post('txt')
  @UseInterceptors(FileInterceptor('file'))
  async parseTxt(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'txt',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const content = await this.fileService.extractTextFromTextDocument(file.buffer);
    return mappingJSONResponse({
      data: content,
    });
  }

  @Post('md')
  @UseInterceptors(FileInterceptor('file'))
  async parseMarkdown(@UploadedFile() file: Express.Multer.File) {
    const content = await this.fileService.extractTextFromMarkdownDocument(file.buffer);
    return mappingJSONResponse({
      data: content,
    });
  }

  @Post('doc')
  @UseInterceptors(FileInterceptor('file'))
  async parseDocx(@UploadedFile() file: Express.Multer.File) {
    const content = await this.fileService.extractTextFromDocxDocument(file.buffer);
    return mappingJSONResponse({
      data: content,
    });
  }

  @Post('pdf')
  @UseInterceptors(FileInterceptor('file'))
  async parsePdf(@UploadedFile() file: Express.Multer.File) {
    const content = await this.fileService.extractTextFromPdfDocument(file.buffer);
    return mappingJSONResponse({
      data: content,
    });
  }
}
