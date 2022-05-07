import { Column, DataType, Model, Table } from "sequelize-typescript";
import { GROUP_STATUS } from "src/constant";

@Table({
    tableName: 'group',
    timestamps: true,
    paranoid: true,
    underscored: true
  })

export class Group extends Model<Group>{
    
    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        unique: true,
    })
    groupName: string;

    @Column({
        type: DataType.STRING,
        defaultValue: 0,
    })
    houseCount: Number;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    schemaName: string;

    @Column({
        type: DataType.ENUM(...Object.values(GROUP_STATUS)),
        allowNull: false,
        defaultValue: GROUP_STATUS.ACTIVE,
    })
    groupStatus: GROUP_STATUS;
}