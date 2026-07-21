import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";
import TeachingFaculty from "@/models/TeachingFaculty";

export class TeachingFacultyDetail extends Model<
    InferAttributes<TeachingFacultyDetail>,
    InferCreationAttributes<TeachingFacultyDetail>
> {
    declare id: CreationOptional<number>;
    declare teachingFacultyId: number;
    declare title: string;
    declare description: string;
    declare displayOrder: number;
    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

TeachingFacultyDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teachingFacultyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "teaching_faculty_id",
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "display_order",
            validate: { min: 1, max: 15 },
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
        tableName: "teaching_faculty_details",
        timestamps: true,
    }
);

TeachingFaculty.hasMany(TeachingFacultyDetail, { as: "details", foreignKey: "teachingFacultyId" });
TeachingFacultyDetail.belongsTo(TeachingFaculty, { as: "faculty", foreignKey: "teachingFacultyId" });

export default TeachingFacultyDetail;
