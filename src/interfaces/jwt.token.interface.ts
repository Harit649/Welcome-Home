import { USER_ROLES, USER_STATUS } from "src/constant";

export interface JwtTokenInterface{
    readonly id: string;
    readonly role_name: USER_ROLES;
    readonly token_type: 'rst' | 'act';
    status?: USER_STATUS; 
}