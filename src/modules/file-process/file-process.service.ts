import * as fs from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import * as pdfParser from 'pdf-parse'
import * as WordExtractor from 'word-extractor'

@Injectable()
export class FileProcessService {
  async extractTextFromTextDocument(buffer: Buffer) {
    try {
      const content = buffer.toString('utf8'); // buffer to string
      return content;
    } catch (err) {
      console.error(err.message);
    }
  }

  async extractTextFromMarkdownDocument(buffer: Buffer) {
    try {
      const content = buffer.toString('utf8');
      return content;
    } catch (err) {
      console.error(err.message);
    }
  }

  async extractTextFromPdfDocument(buffer: Buffer) {
    return await pdfParser(buffer).then(data => {
      return data.text
    })
  }

  async extractTextFromDocxDocument(buffer: Buffer) {
    const wordsExtractor = new WordExtractor()
    const extracted = await wordsExtractor.extract(buffer)
    return extracted.getBody()
  }
}
