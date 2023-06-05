import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  signIn(@Body() signDto: Record<string, any>) {
    return this.authService.signIn(signDto.username, signDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
