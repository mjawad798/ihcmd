import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export const ACADEMIC_PROGRAM_TYPES = [
    "Undergraduate Programs",
    "Postgraduate Diplomas",
    "Certificate Programs",
    "F.Sc Medical Technologies",
] as const;

export type AcademicProgramType = (typeof ACADEMIC_PROGRAM_TYPES)[number];

export class AcademicProgram extends Model<
    InferAttributes<AcademicProgram>,
    InferCreationAttributes<AcademicProgram>
> {
    declare id: CreationOptional<number>;
    declare type: AcademicProgramType;
    declare name: string;
    declare description: string;
    declare picture: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

AcademicProgram.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "academic_programs",
        timestamps: true,
    }
);

export default AcademicProgram;
