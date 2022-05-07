import { Admin } from "src/entities/admin.entity";

export const adminProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useValue: Admin,
  },
];