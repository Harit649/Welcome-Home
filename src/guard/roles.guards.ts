import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_STATUS } from 'src/constant';
import { JwtHelper } from 'src/util/jwt.helper';


/**
 * Roleguard is used as a authentication middleware
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtHelper: JwtHelper) {}

  public async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.jwtHelper.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({ isError: true, message: 'Login required' });
    }

    // Database call for check session
    const admin = await this.jwtHelper.verify(token);

    if (!admin) {
      throw new UnauthorizedException({ isError: true, message: 'Login required' });
    }

    if (admin.status === USER_STATUS.BLOCKED) {
      throw new ForbiddenException('Your account is blocked by admin, please contact admin to get back the access to your account.');
    }

    if (roles.includes(admin.role_name)) {
      request.admin = admin;
      return request;
    }

    throw new ForbiddenException({ isError: true, message: 'Permission denied' });
  }
}
