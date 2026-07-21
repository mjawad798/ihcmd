import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export class TeachingFaculty extends Model<
    InferAttributes<TeachingFaculty>,
    InferCreationAttributes<TeachingFaculty>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare slug: string;
    declare name: string;
    declare designation: string;
    declare qualification: string;
    declare researchInterest: string;
    declare picture: string | null;
    declare email: string | null;
    declare linkedIn: string | null;
    declare researchGate: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

TeachingFaculty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        designation: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        researchInterest: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        linkedIn: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        researchGate: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "teaching_faculty",
        timestamps: true,
    }
);

export default TeachingFaculty;
