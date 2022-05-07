import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";


@Table({
    tableName: 'category',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }) 
 
export class Category extends Model<Category>{

    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

   @Column({
       type: DataType.STRING(32),
       unique: true,
    })
    categoryName: string;

    @CreatedAt
    createdAt: Date;
    
    @UpdatedAt
    updatedAt: Date;
    
    @DeletedAt
    deletedAt: Date;

    // @Column()
    // item: getItem
}