import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";
import AdmissionSession from "@/models/AdmissionSession";
import AcademicProgram from "@/models/AcademicProgram";

import { PROGRAM_LEVELS, STUDY_MODES, GENDERS } from "@/lib/admission";

export class AdmissionApplication extends Model<
    InferAttributes<AdmissionApplication>,
    InferCreationAttributes<AdmissionApplication>
> {
    declare id: CreationOptional<number>;
    declare applicationNo: string;
    declare sessionId: number;
    declare programId: number;

    declare fullName: string;
    declare fatherName: string;
    declare dateOfBirth: string; // DATEONLY -> "YYYY-MM-DD"
    declare gender: (typeof GENDERS)[number];
    declare cnic: string;
    declare contactNo: string;
    declare email: string | null;
    declare postalAddress: string;

    declare programLevel: (typeof PROGRAM_LEVELS)[number];
    declare duration: string | null;
    declare mode: (typeof STUDY_MODES)[number];

    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

AdmissionApplication.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        applicationNo: { type: DataTypes.STRING(40), allowNull: false, unique: true },
        sessionId: { type: DataTypes.INTEGER, allowNull: false },
        programId: { type: DataTypes.INTEGER, allowNull: false },
        fullName: { type: DataTypes.STRING(150), allowNull: false },
        fatherName: { type: DataTypes.STRING(150), allowNull: false },
        dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
        gender: { type: DataTypes.STRING(10), allowNull: false },
        cnic: { type: DataTypes.STRING(15), allowNull: false },
        contactNo: { type: DataTypes.STRING(20), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: true },
        postalAddress: { type: DataTypes.TEXT, allowNull: false },
        programLevel: { type: DataTypes.STRING(20), allowNull: false },
        duration: { type: DataTypes.STRING(60), allowNull: true },
        mode: { type: DataTypes.STRING(20), allowNull: false },
        status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: "Submitted" },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "admission_applications",
        timestamps: true,
        indexes: [{ unique: true, fields: ["session_id", "cnic"], name: "uniq_session_cnic" }],
        underscored: true,
    }
);

export class AdmissionQualification extends Model<
    InferAttributes<AdmissionQualification>,
    InferCreationAttributes<AdmissionQualification>
> {
    declare id: CreationOptional<number>;
    declare applicationId: number;
    declare qualification: string;
    declare boardUniversity: string;
    declare rollNo: string;
    declare passingYear: string;
    declare totalMarks: string;
    declare obtainedMarks: string;
}

AdmissionQualification.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        applicationId: { type: DataTypes.INTEGER, allowNull: false },
        qualification: { type: DataTypes.STRING(100), allowNull: false },
        boardUniversity: { type: DataTypes.STRING(150), allowNull: false },
        rollNo: { type: DataTypes.STRING(40), allowNull: false },
        passingYear: { type: DataTypes.STRING(10), allowNull: false },
        totalMarks: { type: DataTypes.STRING(10), allowNull: false },
        obtainedMarks: { type: DataTypes.STRING(10), allowNull: false },
    },
    {
        sequelize,
        tableName: "admission_application_qualifications",
        timestamps: false,
        underscored: true,
    }
);

AdmissionApplication.hasMany(AdmissionQualification, {
    foreignKey: "applicationId",
    as: "qualifications",
    onDelete: "CASCADE",
});
AdmissionQualification.belongsTo(AdmissionApplication, { foreignKey: "applicationId" });
AdmissionApplication.belongsTo(AdmissionSession, { foreignKey: "sessionId", as: "session" });
AdmissionApplication.belongsTo(AcademicProgram, { foreignKey: "programId", as: "program" });

export default AdmissionApplication;
