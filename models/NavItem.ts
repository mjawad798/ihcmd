import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

export class NavItem extends Model<InferAttributes<NavItem>, InferCreationAttributes<NavItem>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare type: "direct" | "submenu";
    declare link: string | null;
    declare parentId: number | null;
    declare displayOrder: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

NavItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("direct", "submenu"),
            allowNull: false,
            defaultValue: "direct",
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "parent_id",
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "display_order",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "nav_items",
        timestamps: true,
    }
);

NavItem.belongsTo(NavItem, { as: "parent", foreignKey: "parentId" });
NavItem.hasMany(NavItem, { as: "children", foreignKey: "parentId" });

export default NavItem;
