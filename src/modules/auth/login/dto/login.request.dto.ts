import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { validateEmail } from "src/validations/decorator/email";

export class LoginRequestDto{
    @ApiProperty()
    @Transform(({value}) => value.trim())
    @MaxLength(255)
    @IsNotEmpty()
    @validateEmail()
    public readonly email: string;

    @ApiProperty()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    public readonly password: string;
    
}

