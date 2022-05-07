import { AdminSessions } from "src/entities/admin.Session.entity";

export const adminSessionProvider = [
    {
        provide: 'ADMIN_SESSIONS_REPOSITORY',
        useValue: AdminSessions,
    }
];