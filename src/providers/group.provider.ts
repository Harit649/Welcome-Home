import { Group } from "src/entities/group.entity";

export const groupProviders = [
    {
        provide: 'GROUP_REPOSITORY',
        useValue: Group,
    },
];