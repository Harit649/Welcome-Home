import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";


export class ProfileUpdateRequestDto {
  
    @ApiProperty({ maxLength: 24 })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(24)
    @IsNotEmpty()
    user_name: string;
  }