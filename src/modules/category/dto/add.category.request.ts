import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class addCategoryRequestDto{

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public readonly categoryName: string;
}