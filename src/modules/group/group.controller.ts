import { Body, Controller, Get, HttpCode, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/guard/roles.decorator';
import { PaginationInterface } from 'src/interfaces/pagination.interface';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { craeteGroupRequestDto } from './dto/create.group.request.dto';
import { createGroupResponseDto } from './dto/create.group.response.dto';
import { groupListFilterRequestDto } from './dto/groupList.filter.request.dto';
import { groupListFilterResponseDto } from './dto/groupList.filter.response.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupeService: GroupService){}

    /**
     * 
     * @param CraeteGroupRequestDto 
     */
    @ApiOperation({ summary: 'add new Group' })
    @ApiResponse({ status: 200, description: 'Success', type: createGroupResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('Group')
    @UsePipes(ValidationPipe)
    @Post('add-new-group')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    protected async CreateGroupe(@Body() CraeteGroupRequestDto: craeteGroupRequestDto): Promise<SuccessResponse<createGroupResponseDto>>{

        const data = await this.groupeService.createGroup(CraeteGroupRequestDto);
        return {data, message: 'New Groupe SuccessFully Created...'}
    } 

    @ApiOperation({ summary: 'retrive A List of Groups' })
    @ApiResponse({ status: 200, description: 'Success', type: createGroupResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('Group')
    @UsePipes(ValidationPipe)
    @Get('group-list')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    protected async GroupList(@Query() groupListFilterDto: groupListFilterRequestDto): Promise<SuccessResponse<PaginationInterface<groupListFilterResponseDto[]>>> {

        const data = await this.groupeService.groupList(groupListFilterDto);
        return { data, message: 'groupList retrived Successfully...'}
    }
}
