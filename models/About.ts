import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export const ABOUT_TYPES = ["hero", "content", "stat", "leadership"] as const;
export type AboutType = (typeof ABOUT_TYPES)[number];

export class About extends Model<InferAttributes<About>, InferCreationAttributes<About>> {
    declare id: CreationOptional<number>;
    declare type: AboutType;
    declare title: string;
    declare subtitle: string | null;
    declare description: string | null;
    declare picture: string | null;
    declare displayOrder: CreationOptional<number>;
    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

About.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM(...ABOUT_TYPES),
            allowNull: false,
        },
        // Section heading (content), stat value (stat), or person name (leadership).
        title: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        // Unused for content; stat label (stat) or person designation (leadership).
        subtitle: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        // Rich text body for content/leadership sections.
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Photo for content (side image) or leadership (portrait) sections.
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "display_order",
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
        tableName: "about",
        timestamps: true,
    }
);

export default About;
