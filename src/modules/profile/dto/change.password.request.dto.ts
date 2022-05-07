import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsValidPassword } from "src/validations/decorator/password";

export class ChangePasswordRequestDto {
    @ApiProperty()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    public readonly password: string;
  
    @ApiProperty({ minLength: 8, maxLength: 24 })
    @Transform(({ value }) => value.trim())
    @MinLength(8)
    @MaxLength(24)
    @IsValidPassword()
    @IsNotEmpty()
    public readonly newPassword: string;
}
