import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsValidPassword } from "src/validations/decorator/password";

export class ResetPasswordDto{

    @ApiProperty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(32)
    @MaxLength(32)
    public readonly token: string;

    @ApiProperty({ minLength: 8, maxLength: 24 })
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(24)
    @IsValidPassword()
    public readonly password: string;
}