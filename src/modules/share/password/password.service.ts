import { BadRequestException, Inject, Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import sequelize, { where } from 'sequelize';
import { Op, Sequelize } from 'sequelize';
import { Admin } from 'src/entities/admin.entity';
import { PasswordReset } from 'src/entities/passwordreset.entety';
import { EmailHelper } from 'src/util/email.helper';
import { Helper } from 'src/util/helper.service';
import { PasswordHelper } from 'src/util/password.helper';
import { ForgotPasswordDto } from './dto/forgot.password.request.dto';  
import { ResetPasswordDto } from './dto/reset.password.request.dto';

@Injectable()
export class PasswordService {
    constructor(
        @Inject('ADMIN_REPOSITORY') private readonly ADMIN_REPOSITORY: typeof Admin,
        @Inject('PASSWORD_RESET_REPOSITORY') private readonly PASSWORD_RESET_REPOSITORY: typeof PasswordReset,
        @Inject('SEQUELIZE') private readonly SEQUELIZE: Sequelize,
        private readonly helper: Helper,
        private readonly mailer: EmailHelper,
        private readonly password: PasswordHelper,
        ){}

    public async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<[]>{  

        const token = this.helper.generateRandomString(32);
        
        const admin: Admin = await this.ADMIN_REPOSITORY.findOne({ where: { email: forgotPasswordDto.email}});  

        if (!admin) {
            return [];
        }
 
        const isAlreadySent = await this.PASSWORD_RESET_REPOSITORY.count({
            where: {
                user_id: admin.id,
                [Op.and]: [Sequelize.literal(`created_date > NOW() - INTERVAL '30m'`)]
            },
        });

        if (isAlreadySent) {
            return [];
        }
 
        const t1 = await this.SEQUELIZE.transaction();
        try {
            await this.PASSWORD_RESET_REPOSITORY.destroy({where: { user_id: admin.id}, transaction: t1 });

            await this.PASSWORD_RESET_REPOSITORY.create({user_id: admin.id, token: token}, {transaction: t1})

            await this.mailer.sendForgotPasswordMail({  
                user_name: admin.user_name,
                email: admin.email,
                token,
            });
            t1.commit();
            return[];
        } catch (e) {  
            await t1.rollback();
            throw new InternalServerErrorException(e);
        } 
    }
// =======================================================================================================

    public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<[]>{
        const passwordReset = await this.PASSWORD_RESET_REPOSITORY.findOne({
            where: {
                token: resetPasswordDto.token,
                [Op.and]: [Sequelize.literal(`created_date > NOW() - INTERVAL '30m'`)]
            },
        });
        

        // if (!passwordReset) {
        //     throw new BadRequestException('LINK_HAS_BEEN-EXPIRE');
        // }

        const admin: Admin = await this.ADMIN_REPOSITORY.findOne({where: {id: passwordReset.user_id }});
        
        
        if (!admin) {
            throw new BadRequestException('INVALID_ID')
        }

        const t1 = await this.SEQUELIZE.transaction();
        try {
            
            const password_hash = await this.password.generateHash(resetPasswordDto.password);
           

            await this.ADMIN_REPOSITORY.update({password_hash}, {where: {id: passwordReset.user_id}, transaction: t1 });

            await this.PASSWORD_RESET_REPOSITORY.destroy({ where: { user_id: passwordReset.user_id}, transaction: t1 });

            await t1.commit();
            return [];
        } catch (e) {
            await t1.rollback();
            throw new InternalServerErrorException(e);
        }
    }
}
