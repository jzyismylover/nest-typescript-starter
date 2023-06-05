import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from '@/constant';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: '60s'
      }
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService] // 其他模块可用 service 子集
})
export class AuthModule {}
