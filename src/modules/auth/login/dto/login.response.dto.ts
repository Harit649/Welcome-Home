import { ApiProperty } from "@nestjs/swagger";
import { adminDto } from "src/dto/admin.dto";
import { Admin } from "src/entities/admin.entity";

export class LoginResponseDto extends adminDto{
    
    @ApiProperty()
    protected readonly token: string;

    constructor(admin: Admin ,token: string){
        super(admin);
        this.token = token;
    }
}