import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";
import Role from "@/models/Role";

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
    declare id: CreationOptional<number>;
    declare roleId: number;
    declare formName: string;
    declare canAdd: CreationOptional<boolean>;
    declare canView: CreationOptional<boolean>;
    declare canEdit: CreationOptional<boolean>;
    declare canDelete: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
        },
        formName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "form_name",
        },
        canAdd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "can_add",
        },
        canView: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "can_view",
        },
        canEdit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "can_edit",
        },
        canDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "can_delete",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "permissions",
        timestamps: true,
        indexes: [{ unique: true, fields: ["role_id", "form_name"] }],
    }
);

Role.hasMany(Permission, { as: "permissions", foreignKey: "roleId" });
Permission.belongsTo(Role, { as: "role", foreignKey: "roleId" });

export default Permission;
