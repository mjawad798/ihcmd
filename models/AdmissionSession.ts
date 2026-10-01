import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export class AdmissionSession extends Model<
    InferAttributes<AdmissionSession>,
    InferCreationAttributes<AdmissionSession>
> {
    declare id: CreationOptional<number>;
    declare sessionName: string;
    // Short code used in application numbers, e.g. "F26" -> IHCMNS-F26-0001.
    declare code: string;
    declare isActive: CreationOptional<boolean>;
    declare isOpenForAdmission: CreationOptional<boolean>;
    // Last serial handed out for this session; incremented under a row lock.
    declare lastSerial: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

AdmissionSession.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isOpenForAdmission: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        lastSerial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "admission_sessions",
        timestamps: true,
    }
);

export default AdmissionSession;
