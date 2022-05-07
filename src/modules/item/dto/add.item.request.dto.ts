import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Unique } from "sequelize-typescript";

export class addItemRequestDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly itemName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly ItemDescription: string;
}