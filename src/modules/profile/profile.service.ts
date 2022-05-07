import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { PasswordHelper } from 'src/util/password.helper';
import { ChangePasswordRequestDto } from './dto/change.password.request.dto';
import { profileResponseDto } from './dto/profile.response.dto';
import { ProfileUpdateRequestDto } from './dto/profile.update.request.dto';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('ADMIN_REPOSITORY') private readonly ADMIN_REPOSITORY: typeof Admin,
        private readonly password: PasswordHelper,
    ){}

    /**
   * Get logged in admin's profile details
   * @param  JwtTokenInterface
   * @returns ProfileResponseDto
   */

    async profile(jwtTokenInterface : JwtTokenInterface): Promise<profileResponseDto>{
        
        const admin = await this.ADMIN_REPOSITORY.findOne({
            where: {
                id: jwtTokenInterface.id,
            },
        })
        if (!admin) {
            throw new UnauthorizedException({ isError: true, message: 'Login required' }); 
        }

        return new profileResponseDto(admin);  
    }

    async updateProfile(jwtTokenInterface : JwtTokenInterface, profileUpdtateRequestDto: ProfileUpdateRequestDto): Promise<profileResponseDto>{
        await this.ADMIN_REPOSITORY.update({
            user_name: profileUpdtateRequestDto.user_name,
        },
        {
            where: {
                id: jwtTokenInterface.id,
            }
        });
        const data = await this.ADMIN_REPOSITORY.findOne({where: {id: jwtTokenInterface.id}});
        
        if (!data) {
            throw new NotFoundException()
        } else {
            return new profileResponseDto(data);
        }    
    }

    async changePassword(jwtTokenInterface : JwtTokenInterface, changePasswordRequestDto: ChangePasswordRequestDto): Promise<[]>{
        
       const admin =  await this.ADMIN_REPOSITORY.findOne({where: { id: jwtTokenInterface.id}});
        
        try{
            await this.password.compare(changePasswordRequestDto.password, admin.password_hash);
        }catch(e){
            throw new BadRequestException('Old password is incorrect...');
        }

        try{
            const password_hash = await this.password.generateHash(changePasswordRequestDto.newPassword);

            await this.ADMIN_REPOSITORY.update(
                {
                    password_hash: password_hash,
                },
                {
                    where: {id: jwtTokenInterface.id}
                },
            );
            return [];
        }catch(e){
            throw new InternalServerErrorException();
        }
    }
}
