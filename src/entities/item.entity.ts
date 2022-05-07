import { Column, DataType, Table, Model } from "sequelize-typescript";


@Table({
    tableName: 'item',
    timestamps: true,
    paranoid: true,
    underscored: true,
})

export class Item extends Model<Item>{
    
    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    userId: string; 

    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    categoryId: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        unique: true,
    })
    itemName: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    ItemDescription: string;
}