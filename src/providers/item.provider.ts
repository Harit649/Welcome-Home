import { Item } from "src/entities/item.entity";

export const itemProvider = [
    {
        provide: 'ITEM_REPOSITORY',
        useValue: Item,
    },
]; 