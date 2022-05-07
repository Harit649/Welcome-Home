import { PasswordReset } from "src/entities/passwordreset.entety";

export const PasswordResetProvider = [
    {
        provide: 'PASSWORD_RESET_REPOSITORY',
        useValue: PasswordReset,
    }
]