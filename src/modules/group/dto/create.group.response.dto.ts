import { ApiProperty } from "@nestjs/swagger";
import { GROUP_STATUS } from "src/constant";
import { Group } from "src/entities/group.entity";

export class createGroupResponseDto{

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly groupName: string;

    @ApiProperty()
    readonly houseCount: Number;

    @ApiProperty()
    readonly schemaName: string;

    @ApiProperty({enum: GROUP_STATUS})
    readonly groupStatus: GROUP_STATUS;

    constructor(group: Group){
        this.id = group.id;
        this.groupName = group.groupName;
        this.schemaName = group.schemaName;
        this.groupStatus = group.groupStatus;
        this.houseCount = Number(group['count']);
    }
}