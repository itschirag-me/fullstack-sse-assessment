import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ErrorMessages } from 'src/constant/errorMessages';
import { IS_PUBLIC } from 'src/decorators/public/public.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(ErrorMessages.jwt.NO_AUTHENTICATION);
    }

    try {
      const payload = this.jwtService.verify(token);

      const user = await this.userService.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException(ErrorMessages.jwt.INVALID);
      }

      request['user'] = user;
      request['token'] = token;

      return true;
    } catch {
      throw new UnauthorizedException(ErrorMessages.jwt.INVALID);
    }
  }

  /**
   * Extract token from header authorization
   * @param request Request
   * @returns {string | undefined}
   */
  extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization) {
      return undefined;
    }
    const [type, token] = request.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      return undefined;
    }
    return token;
  }
}
