import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { USER_ROLES } from 'src/constant';
import { Admin } from 'src/entities/admin.entity';
import { AdminSessions } from 'src/entities/admin.Session.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { JwtHelper } from 'src/util/jwt.helper';
import { PasswordHelper } from 'src/util/password.helper';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject('ADMIN_REPOSITORY') private readonly ADMIN_REPOSITORY: typeof Admin,
    @Inject('ADMIN_SESSIONS_REPOSITORY') private readonly ADMIN_SESSIONS_REPOSITORY: typeof AdminSessions,
    private readonly password: PasswordHelper,
    private readonly jwtToken: JwtHelper,
  ) {}

  public async adminLogin(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const admin: Admin = await this.ADMIN_REPOSITORY.findOne({
      where: {email: loginRequestDto.email, role: USER_ROLES.SUPERADMIN},
      // where: {
      //   [Op.and]: [{ email: loginRequestDto.email}, { role: ADMIN_ROLES.SUPERADMIN}],
      // },
    }); 
    
    if (!admin) {
      throw new BadRequestException('invalid Email or Password.');
    }

    try {
      await this.password.compare(loginRequestDto.password, admin.password_hash);
    } catch (e) {
      throw new BadRequestException('invalid Email or Password.');
    }

    if (admin.is_email_verified === false) {
      throw new BadRequestException('Your email is not verified! Please verify your email address.');
    }

    // if (admin.status === ADMIN_STATUS.BLOCKED) {
    //   throw new ForbiddenException(
    //     'Your account is blocked by SuperAdmin, please contact admin to get back the access to your account.',
    //   );
    // }

    const tokenDto: JwtTokenInterface = {
      id: admin.id,
      role_name: admin.role,
      token_type: 'act',
    };
    const jwtToken = await this.jwtToken.generateToken(tokenDto);

    // store JWT token into session table...
    await this.ADMIN_SESSIONS_REPOSITORY.create({
      user_id: admin.id, // for user_id : first it will check if there is amy user_id(admin_id) available or not, if not then it will create new User_id(Admin_id) into database(table).
      jwt_token: jwtToken,
    });

    return new LoginResponseDto(admin, jwtToken);
  }
}
