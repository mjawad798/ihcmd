import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";
import { ACHIEVEMENT_ICONS, type AchievementIcon } from "@/lib/achievementIcons";

export class Achievement extends Model<InferAttributes<Achievement>, InferCreationAttributes<Achievement>> {
    declare id: CreationOptional<number>;
    declare icon: AchievementIcon;
    declare count: string;
    declare label: string;
    declare displayOrder: CreationOptional<number>;
    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Achievement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        icon: {
            type: DataTypes.ENUM(...ACHIEVEMENT_ICONS),
            allowNull: false,
        },
        // Free text so it can hold "5000+", "100%", "15+", etc.
        count: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING(200),
            allowNull: false,
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
        tableName: "achievements",
        timestamps: true,
    }
);

export default Achievement;
