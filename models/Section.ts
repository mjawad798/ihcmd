import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

// Generic page-builder resource — powers arbitrary one-off content pages
// (ORIC, QEC, etc.) served at /[slug]. A section without a picture renders
// as a plain navy header; with a picture, the picture becomes a banner.
export class Section extends Model<InferAttributes<Section>, InferCreationAttributes<Section>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;
    declare isActive: CreationOptional<boolean>;
    declare picture: string | null;
    declare description: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Section.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(300),
            allowNull: false,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "sections",
        timestamps: true,
    }
);

export default Section;
