import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { IsDate } from "sequelize-typescript";

export class addPersonRequestDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly person_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @MaxLength(255)
    public readonly mobile_number: Number;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    public readonly date_of_birth: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly city: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly state: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @MaxLength(255)
    public readonly pin: Number;
}

