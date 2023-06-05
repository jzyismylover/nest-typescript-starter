import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllFilter } from './common/filter/all.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllFilter()) // 全局异常捕获
  await app.listen(3001);
}
bootstrap();
