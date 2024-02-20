/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
dotenv.config();
const env = {
    MONGO_URL: process.env.MONGO_URL!,
    SERVER_PORT: process.env.SERVER_PORT!,
    DATABASE_NAME: process.env.DATABASE_NAME!,
    BASE_URL: process.env.BASE_URL!,
};

export default env;
