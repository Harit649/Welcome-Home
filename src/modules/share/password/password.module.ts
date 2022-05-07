import { Module } from '@nestjs/common';
import { adminProviders } from 'src/providers/admin.provider';
import { PasswordResetProvider } from 'src/providers/password.reset.provider';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports:[],
  controllers: [PasswordController],
  providers: [PasswordService, ...adminProviders, ...PasswordResetProvider],
})
export class PasswordModule {}
