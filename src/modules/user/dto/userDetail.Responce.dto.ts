import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLES, USER_STATUS } from "src/constant";
import { Admin } from "src/entities/admin.entity";

export class userDetailResponseDto{

    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly user_name: string;
    
    @ApiProperty()
    role: USER_ROLES;

    @ApiProperty()
    status: USER_STATUS;

    @ApiProperty()
    is_email_verified: boolean;
    
    @ApiProperty()
    updated_date: Date;
    
    @ApiProperty()
    deleted_date: Date;
    
    @ApiProperty()
    created_date: Date;

    constructor(admin: Admin){

        this.id = admin.id,
        this.user_name = admin.user_name,
        this.email = admin.email,
        this.role = admin.role,
        this.role = admin.role,
        this.is_email_verified = admin.is_email_verified,
        this.updated_date = admin.updated_date,
        this.deleted_date = admin.deleted_date,
        this.created_date = admin.created_date;
    }

}