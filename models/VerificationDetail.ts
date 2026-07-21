import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";
import VerificationMaster from "@/models/VerificationMaster";

export class VerificationDetail extends Model<
    InferAttributes<VerificationDetail>,
    InferCreationAttributes<VerificationDetail>
> {
    declare id: CreationOptional<number>;
    declare verificationMasterId: number;
    declare serialNumber: string;
    declare registrationNo: string;
    declare studentName: string;
    declare fatherName: string;
    declare duration: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

VerificationDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        verificationMasterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "verification_master_id",
        },
        serialNumber: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: "serial_number",
        },
        registrationNo: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: "registration_no",
        },
        studentName: {
            type: DataTypes.STRING(300),
            allowNull: false,
            field: "student_name",
        },
        fatherName: {
            type: DataTypes.STRING(300),
            allowNull: false,
            field: "father_name",
        },
        duration: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "verification_detail",
        timestamps: true,
        indexes: [{ unique: true, fields: ["verification_master_id", "serial_number"] }],
    }
);

VerificationMaster.hasMany(VerificationDetail, { as: "details", foreignKey: "verificationMasterId" });
VerificationDetail.belongsTo(VerificationMaster, { as: "master", foreignKey: "verificationMasterId" });

export default VerificationDetail;
