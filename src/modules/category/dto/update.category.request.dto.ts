import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateCategoryNameRequestDto{
    
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public readonly categoryName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public readonly newCategoryName: string;
}


