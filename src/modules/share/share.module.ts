import { Module } from '@nestjs/common';
import { LogoutModule } from './logout/logout.module';
import { PasswordModule } from './password/password.module';

@Module({
    imports:[LogoutModule, PasswordModule],
    exports:[],
    providers:[],
})
export class ShareModule {}
