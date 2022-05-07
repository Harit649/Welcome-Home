import { Body, Controller, Get, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatchers/transform.interseptor';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginService } from './login.service';

@Controller('v1/auth')
@UseInterceptors(TransformInterceptor)
export class LoginController {

    constructor(private readonly loginService: LoginService){}

    /**
   * Login User
   * @param adminloginRequestDto
   */
    @ApiOperation({ summary: 'Login into the system' })
    @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid id or password' })
    @ApiForbiddenResponse({ description: 'Your email is not verified! Please verify your email address.' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiTags('login')
    @Post()
    @HttpCode(200)

    protected async Adminlogin(@Body() adminloginRequestDto: LoginRequestDto): Promise<SuccessResponse<LoginResponseDto>>{
        const data = await this.loginService.adminLogin(adminloginRequestDto);
        return { data, message: " login succesfully"};
    }

     /**
   * Health check
   * @param
   */
  
    @ApiOperation({ summary: 'Health check' })
    @Get('/healthcheck')
    @HttpCode(200)
    protected async() {
        return { data: 'Working....' };
    }
}
