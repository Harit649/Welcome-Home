import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class craeteGroupRequestDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly groupName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public readonly schemaName: string;
}


