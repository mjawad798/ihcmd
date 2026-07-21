import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "@/lib/sequelize";

// Singleton settings row (always id = 1) — there is exactly one footer
// across the site, so this isn't a list resource like Hospitals/Affiliations.
// getFooterSettings()/the admin form always read and write row id 1.
export const FOOTER_SETTINGS_ID = 1;

export class FooterSetting extends Model<InferAttributes<FooterSetting>, InferCreationAttributes<FooterSetting>> {
    declare id: CreationOptional<number>;
    declare description: string;
    declare facebookUrl: string | null;
    declare instagramUrl: string | null;
    declare tiktokUrl: string | null;
    declare phone: string;
    declare email: string;
    declare address: string;
    declare mapUrl: string | null;
    declare developerName: string | null;
    declare developerEmail: string | null;
    declare copyrightText: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

FooterSetting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        facebookUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: "facebook_url",
        },
        instagramUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: "instagram_url",
        },
        tiktokUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: "tiktok_url",
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mapUrl: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: "map_url",
        },
        developerName: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: "developer_name",
        },
        developerEmail: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: "developer_email",
        },
        copyrightText: {
            type: DataTypes.STRING(300),
            allowNull: false,
            field: "copyright_text",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "footer_settings",
        timestamps: true,
    }
);

export default FooterSetting;
