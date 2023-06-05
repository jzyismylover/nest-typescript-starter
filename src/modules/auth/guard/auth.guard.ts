import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { SECRET_KEY } from '@/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getHandler(),
    ]);
    if(isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if(!token) {
      throw new UnauthorizedException() // 传递给全局异常过滤器
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: SECRET_KEY
      })
      request['user'] = payload
    } catch(err) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
