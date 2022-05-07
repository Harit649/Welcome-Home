import { adminDto } from "src/dto/admin.dto";
import { Admin } from "src/entities/admin.entity";

export class profileResponseDto extends adminDto{
    constructor(admin: Admin){
        super(admin);
    }
}