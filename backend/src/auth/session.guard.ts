import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // express-session assigns the user object to session if authenticated
    if (request.session && (request.session as any).user) {
      return true;
    }
    
    throw new UnauthorizedException('Please login to access this resource.');
  }
}
