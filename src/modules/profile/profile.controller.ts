import { Body, Controller, Get, Param, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Caller } from 'src/decorators/caller.decorator';
import { TransformInterceptor } from 'src/dispatchers/transform.interseptor';
import { Roles } from 'src/guard/roles.decorator';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { SuccessResponse } from 'src/interfaces/successresponce';
import { ChangePasswordRequestDto } from './dto/change.password.request.dto';
import { profileResponseDto } from './dto/profile.response.dto';
import { ProfileUpdateRequestDto } from './dto/profile.update.request.dto';
import { ProfileService } from './profile.service';

/**
 * Profile controller is used for retrive and update profile and password
 */
 @Controller('v1/profile')
 @ApiTags('Profile')
 @ApiBearerAuth()
 @ApiInternalServerErrorResponse({ description: 'Internal server error' })
 @UseInterceptors(TransformInterceptor)

export class ProfileController {
    constructor(private readonly profileService :ProfileService){}

    /**
     * @param admin  
     */
    @ApiTags('Profile')
    @ApiOperation({ summary: 'Get my profile' })
    @ApiOkResponse({ description: 'Success', type: profileResponseDto })
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBadRequestResponse({ description: 'Invalid user id' })
    @Get()
    @ApiBearerAuth()
    @Roles('SUPERADMIN')
    protected async profile(@Caller() jwtTokenInterface: JwtTokenInterface): Promise<SuccessResponse<profileResponseDto>>{ 
        
        const data = await this.profileService.profile(jwtTokenInterface);
        return { data, message: 'PROFILE_DATA_RETRIVED'};
    }

    /**
     * 
     * @param jwtTokenInterface 
     * @param profileUpdtateRequestDto 
     */
    @ApiOperation({ summary: 'Update Profile API' })
    @ApiOkResponse({ description: 'Profile has been updated successfully', type: profileResponseDto })
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @ApiBadRequestResponse({ description: 'Invalid user id' })
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Put()
    @Roles('SUPERADMIN')
    protected async ProfileUpdate(

        @Caller() jwtTokenInterface: JwtTokenInterface,
        @Body() profileUpdtateRequestDto: ProfileUpdateRequestDto): Promise<SuccessResponse<profileResponseDto>>{

            const data = await this.profileService.updateProfile(jwtTokenInterface, profileUpdtateRequestDto);
            return {data, message: 'Profile has been updated successfully.'}
    }

    /**
     * 
     * @param jwtTokenInterface 
     * @param changePasswordRequestDto 
     */
    @ApiOperation({ summary: 'Change password API' })
    @ApiOkResponse({ description: 'Password has been changed successfully' })
    @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' }) 
    @ApiUnauthorizedResponse({ description: 'Login required' })
    @Put('password/change')
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Roles('SUPERADMIN')
    protected async ChangePassword(

        @Caller() jwtTokenInterface: JwtTokenInterface, 
        @Body() changePasswordRequestDto: ChangePasswordRequestDto): Promise<object>{

            await this.profileService.changePassword(jwtTokenInterface, changePasswordRequestDto);
            return{ message: 'PASSWORD SUCCESFULLY CHANGE'}
    }

}



