import { Inject, Injectable } from '@nestjs/common';
import { AdminSessions } from 'src/entities/admin.Session.entity';

@Injectable()
export class LogoutService {
    constructor(@Inject('ADMIN_SESSIONS_REPOSITORY') private readonly ADMIN_SESSIONS_REPOSITORY:typeof AdminSessions){}

    /**
     * 
     * @param token string
     * @returns []
     */
    public async logout(token: string): Promise<[]>{
        await this.ADMIN_SESSIONS_REPOSITORY.destroy({ where: { jwt_token: token } });
        return [];
    }
    
}
