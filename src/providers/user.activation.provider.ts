import { AdminActivations } from "src/entities/adminactivation.entity";

export const adminActivationsProviders = [
    {
      provide: 'ADMIN_ACTIVATIONS_REPOSITORY',
      useValue: AdminActivations,
    },
  ];