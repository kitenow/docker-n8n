import { Controller, Post, Body, Req, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: any, @Req() req: Request) {
    const user = await this.authService.validateUser(body.email, body.password);
    
    // Attach user to express-session
    (req.session as any).user = user;
    
    return { message: 'Logged in successfully', user };
  }

  @UseGuards(SessionGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return (req.session as any).user;
  }

  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });
    return { message: 'Logged out successfully' };
  }
}
