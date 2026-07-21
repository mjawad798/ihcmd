import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export class Download extends Model<InferAttributes<Download>, InferCreationAttributes<Download>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare file: string;
    declare showInDownloads: CreationOptional<boolean>;
    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Download.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        showInDownloads: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "show_in_downloads",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "downloads",
        timestamps: true,
    }
);

export default Download;
