import { Global, Module } from '@nestjs/common';
import { EmailHelper } from './email.helper';
import { Helper } from './helper.service';
import { JwtHelper } from './jwt.helper';
import { PasswordHelper } from './password.helper';

const service = [PasswordHelper,JwtHelper, EmailHelper,Helper];

@Global()
@Module({
    imports:[],
    providers:[...service],
    exports:service,

})
export class UtilModule {}
