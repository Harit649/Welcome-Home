import { Category } from "src/entities/category.entity";

export const categoryProvider = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useValue: Category,
    },
];