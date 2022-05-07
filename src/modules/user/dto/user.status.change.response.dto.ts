import { USER_ROLES, USER_STATUS } from "src/constant";
import { adminDto } from "src/dto/admin.dto";
import { Admin } from "src/entities/admin.entity";

export class userStatusChangeResponseDto extends adminDto{

    readonly id: string;
    readonly email: string;
    readonly role: USER_ROLES;
    readonly status: USER_STATUS;

    constructor(admin: Admin) {
        super(admin);
        this.id = admin.id;
        this.email = admin.email;
        this.role = admin.role;
        this.status  = admin.status;
    }

}