import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { SoftwareModule } from './modules/system/system.module';
import { FileProcessModule } from './modules/file-process/file-process.module';
import { LoggerMiddleware } from './common/middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SoftwareModule, FileProcessModule, AuthModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 粗粒度应用中间件到controller
    // consumer.apply(LoggerMiddleware).forRoutes(SoftwareController, FileProcessController)

    // 精细控制中间件可使用范围
    const _route: RouteInfo[] = [
      {
        path: 'software/memory',
        method: RequestMethod.ALL,
      },
      {
        path: 'file-process*',
        method: RequestMethod.ALL,
      },
    ];
    consumer.apply(LoggerMiddleware).forRoutes(..._route);
  }
}
