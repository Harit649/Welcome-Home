import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Admin } from 'src/entities/admin.entity';
import { AdminSessions } from 'src/entities/admin.Session.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';

/**
 * JWT token helper
 */
@Injectable()
export class JwtHelper {
  /**
   * Create JWT token
   * @param tokenDto
   */
  public async generateToken(tokenDto: JwtTokenInterface, expiredTime?: string): Promise<string> {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET, {
      expiresIn: expiredTime || process.env.JWT_EXPIRED_TIME,
    });
    return token;
  }

  public async decodeToken(token: string): Promise<false | JwtTokenInterface> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as JwtTokenInterface;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @param token
   */
  public async verify(token: string): Promise<false | JwtTokenInterface> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtTokenInterface;

      const session = await AdminSessions.findOne({
        where: { jwt_token: token },
        include: [
          {
            model: Admin,
            required: true,
          },
        ],
      });

      if (!session) {
        return false;
      }

      payload.status = session.admin.status;

      return payload;
    } catch (e) {
      return false;
    }
  }

  /**
   * Retrive token from request header
   * @param request
   */
  public getTokenFromHeader(request: Request): string {
    
    let token = request.headers['x-access-token'] || request.headers['authorization'];

    if (Array.isArray(token)) {
      token = token[0];
    }

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return token.slice(7, token.length);
    }
    return token;
  }
}
