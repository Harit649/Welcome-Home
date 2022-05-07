import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES, USER_STATUS } from 'src/constant';
import { Admin } from 'src/entities/admin.entity';
;

/**
 * Admin DTO
 */
export class adminDto {
  @ApiProperty()
  protected readonly id: string;

  @ApiProperty()
  protected readonly email: string;

  @ApiProperty({ enum: USER_ROLES })
  protected readonly role: USER_ROLES;

  @ApiProperty({ enum: USER_STATUS })
  protected readonly status: USER_STATUS;

  @ApiProperty()
  protected readonly user_name: string;

  @ApiProperty()
  protected readonly avatar: string;

  constructor(admin: Admin) {
    this.id = admin.id;
    this.email = admin.email;
    this.role = admin.role;
    this.status = admin.status;
    this.user_name = admin.user_name;
    this.avatar = admin.avatar;
  }
}
