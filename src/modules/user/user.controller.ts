import { Controller, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { USER_STATUS } from 'src/constant';
import { Roles } from 'src/guard/roles.decorator';
import { PaginationInterface } from 'src/interfaces/pagination.interface';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { userListfilterRequestDto } from './dto/user.list.filter.request.dto';
import { userListResponseDto } from './dto/user.list.Responce.dto';
import { userStatusChangeResponseDto } from './dto/user.status.change.response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    /**
     * 
     * @param filterDto 
     */
    @ApiOperation({ summary: 'retrive list of users' })
    @ApiResponse({ status: 200, description: 'Success', type: userListResponseDto})
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('User')
    @UsePipes(ValidationPipe)
    @Get('user-list')
    @HttpCode(200)
    @Roles('SUPERADMIN')
    protected async UserList(@Query() filterDto: userListfilterRequestDto): Promise<SuccessResponse<PaginationInterface<userListResponseDto[]>>>{
        const data = await this.userService.userList(filterDto);
        return { data, message: "user-list are retrived..."} 
    }

    /**
     * 
     * @param userId 
     */
    @ApiOperation({ summary: 'retrive Detail of users' })
    @ApiResponse({ status: 200, description: 'Success'})
    @ApiTags('User')
    @Roles('SUPERADMIN')
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    @Get('/:id')
    protected async UserDetail(@Param('id', new ParseUUIDPipe()) userId: string): Promise<SuccessResponse<any>>{
        const data = await this.userService.userDetail(userId);
        return { data, message: "User-detail are retrived..."}
    }

    /**
     * 
     * @param userId 
     */
    @ApiOperation({ summary: 'Change user status' })
    @ApiOkResponse({ description: 'User has been ${activated/blocked} successfully', type: userStatusChangeResponseDto })
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBearerAuth()
    @ApiTags('User')
    @Put('status/:id')
    @UsePipes(ValidationPipe)
    @Roles('SUPERADMIN')
    protected async StatusChange(@Param('id', new ParseUUIDPipe()) userId: string): Promise<SuccessResponse<userStatusChangeResponseDto>>{

        const data = await this.userService.statusChange(userId);
        const status = data.status === USER_STATUS.ACTIVE ? 'activeted' : 'blocked';

        return { message: `User has been ${status} successfully`, data};
    }
   
   
}
