import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { JwtHelper } from 'src/util/jwt.helper';
import { LogoutService } from './logout.service';
import { Request } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/guard/roles.decorator';
import { TransformInterceptor } from 'src/dispatchers/transform.interseptor';

@Controller('logout')

@Controller('v1/logout')
@ApiTags('logout')
@ApiInternalServerErrorResponse({description: 'Internal server errer'})
@ApiOkResponse({description: 'logout Succesfully'})
@UseInterceptors(TransformInterceptor)

export class LogoutController {
    constructor(private readonly logoutService: LogoutService, 
                private readonly jwtToken: JwtHelper){}

    @ApiOperation({summary: 'Logout'})
    @ApiResponse({description: 'Logout Succesfully'})
    @Post()
    @Roles('SUPERADMIN')
    @ApiBearerAuth()
    protected async logout(@Req() request: Request): Promise<SuccessResponse<[]>>{

        const token = this.jwtToken.getTokenFromHeader(request); 
        await this.logoutService.logout(token);
        return {data: [], message: "You Succesfully Logout"};
    }
}
