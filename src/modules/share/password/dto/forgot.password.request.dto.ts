import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";
import { validateEmail } from "src/validations/decorator/email";

export class ForgotPasswordDto{
    @ApiProperty()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @validateEmail()
    @MaxLength(255)
    public readonly email: string;
}