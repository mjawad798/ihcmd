import { Sequelize } from "sequelize";

const globalForSequelize = global as unknown as { sequelize?: Sequelize };

export const sequelize =
    globalForSequelize.sequelize ??
    new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
            dialect: "mysql",
            logging: false,
        }
    );

if (process.env.NODE_ENV !== "production") {
    globalForSequelize.sequelize = sequelize;
}

export default sequelize;
