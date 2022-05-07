import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLES, USER_STATUS } from "src/constant";
import { Admin } from "src/entities/admin.entity";

export class userListResponseDto{

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty({ enum: USER_ROLES })
    readonly role: USER_ROLES;

    @ApiProperty({ enum: USER_STATUS })
    readonly status: USER_STATUS;

    @ApiProperty()
    readonly user_name: string;

    @ApiProperty()
    readonly avatar: string;

    @ApiProperty()
    readonly created_date: Date;

    @ApiProperty()
    readonly AdminSessions: number;

    constructor(admin: Admin) {
        this.id = admin.id;
        this.email = admin.email;
        this.role = admin.role;
        this.status = admin.status;
        this.user_name = admin.user_name;
        this.avatar = admin.avatar;
        this.created_date = admin.created_date;
        this.AdminSessions = Number(admin['count']);
    }
}