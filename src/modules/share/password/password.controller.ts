import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/guard/roles.decorator';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { ForgotPasswordDto } from './dto/forgot.password.request.dto';
import { ResetPasswordDto } from './dto/reset.password.request.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
    constructor(private readonly passwordservice: PasswordService){}

    @ApiTags('password')
    @ApiOperation({ summary: 'Forgot password API' })
    @ApiOkResponse({
        status: 200,
        description: 'An email has been sent out to the supplied email address. Follow the instructions in the email to reset your password.',
    })
    @ApiBadRequestResponse({ description: 'Email not registered with us / Email already sent' })
    @ApiForbiddenResponse({ description: 'User blocked by admin' })
    @HttpCode(200)
    @Roles('SUPERADMIN')
    @UsePipes(ValidationPipe)
    @Post('forgot')
    protected async ForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<SuccessResponse<[]>>{
        const data = await this.passwordservice.forgotPassword(forgotPasswordDto);
        return { data, message: 'FORGOT_PASSWORD_SUCCESS'};
    }

  @ApiTags('password')
  @ApiOperation({
    summary: 'Reset password API',
    description: `NOTE: steps to use this API \n
                    1.call password/forgot API \n
                    2.click on password reset link sent to your email Id \n
                    3.enter new password \n
                    4.execute`,
  })
  @ApiOkResponse({ description: 'Password has been reset successfully' })
  @ApiBadRequestResponse({ description: 'Invalid token / User blocked by admin' })
  @HttpCode(200)
  @Post('reset')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
 
    protected async PasswordReset(@Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse<[]>>{
        const data = await this.passwordservice.resetPassword(resetPasswordDto);
        return {data, message: 'RESET_PASSWORD_SUCCESS'};
    }
}
